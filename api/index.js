const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const multer=require("multer");
const path=require("path");
var cors = require('cors');
const app=express();


 dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("hello there")
})

app.use(cors());
app.use("/images",express.static(path.join(__dirname,"public/images")))

//middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(helmet())
app.use(morgan("common"))

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/images");
//     },
//     filename: (req,file,cb)=>{
//         console.log("this is actual file name-");
//         console.log("this is actual file name-" + req.body.name);
//         const newName=Date.now()+file.originalname
//         cb(null,newName)
//     }
// })

// const upload = multer({storage});
// app.post("/api/upload", upload.single("file"), (req,res)=>{
//     try{
//         return res.status(200).json("file uploaded successfully.")
//     }catch(err){
//         console.log(err)
//     }
// })

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)

app.listen(8800,()=>{
    console.log("backend server is running!jdjdj")
})