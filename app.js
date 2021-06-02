const express=require("express")
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"})
require("./db/conn")

app.use(express.json())
app.use(require("./routes/auth"))

const middleware=(req,res,next)=>{
    console.log("Hello thi is middleware")
    next()
}
// middleware();
app.get("/",(req,res)=>{
    res.send("Hello this is home page")
})
app.get("/about",middleware,(req,res)=>{
    console.log(("this is about"))
    res.send("Hello this is about page")
})
app.get("/contact",(req,res)=>{
    res.send("Hello this is contact page")
})
app.get("*",(req,res)=>{
    res.send("404 not found")
})


app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})