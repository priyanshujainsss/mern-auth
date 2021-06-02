const express=require("express");
const bcrypt=require("bcryptjs");
const router=express.Router();
require("../db/conn");
const User=require("../model/userSchema");
router.get("/",(req,res)=>{
   User.find({},(err,data)=>{
  if(err){
      res.send(err)
  }
  else{
      res.send(data)
  }
   })
})
// router.post("/register",(req,res)=>{
//     const {name,email,phone,work,password,cpassword}=req.body
//     if(!name||!email||!phone||!work||!password||!cpassword){
//         res.status(422).json({error:"Please fill complete details"}) 
//      }
//      else{
//          if(password != cpassword){
//              res.send("please enter correct password")
//          }
//          else{
//              User.findOne({email})
//              .then((userExist)=>{
//                  if(userExist)
//                 return res.send("Email already exist");
                 
//                     const user=new User({name,email,phone,work,password,cpassword});
//             user.save().then(()=>{
//                 res.send("Successfully registered")
//             }).catch(()=>{
//                 res.send("failed to registered")
//             })
//              })
//              .catch(err=>{
//                  res.send(err)
//              })
             
//          }
//      }
    
// })
router.post("/register",async (req,res)=>{
    
    const {name,email,phone,work,password,cpassword}=req.body
    if(!name||!email||!phone||!work||!password||!cpassword){
        res.status(422).json({error:"Please fill complete details"}) 
     }
    try{
  const userExist= await User.findOne({email:email});
  if(userExist){
    return res.send("Email already exist");
}
else if(password != cpassword){
     return res.send("password are not matching")
}
else
   {const user=new User({name,email,phone,work,password,cpassword});

   await user.save();
   
   res.send("user registered successfully")
}
    

    }
    catch(err){
        console.log(err)
    }
    })

 router.post("/login",async (req,res)=>{
     
     try{
         const {email,password}=req.body;
       if (!email || !password){
           res.send("Please enter credentials")
       }
     const userLogin=await User.findOne({email});
     if(userLogin){
        const isMatch=await bcrypt.compare(password,userLogin.password);
        const token= await userLogin.generateAuthToken();
        console.log(token)
        if(!isMatch){
            res.send("Invalid credentials")
        }
        else{
            res.send("user login successfully")
        }
     }
     else{
        res.send("Invalid credentials")

     }
    
     
  
     }
     catch(err){
            console.log(err)
     }
 })   

module.exports=router