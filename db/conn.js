const mongoose  = require("mongoose")
const DB=process.env.Database;

mongoose.connect(DB,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }).then(()=>{
 console.log("database connected")
}).catch((err)=>{
    console.log("database not connected")
})