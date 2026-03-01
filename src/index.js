import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();// to be consistent using module js
connectDB()
.then(()=>{
  app.on("error",(error)=>{
     console.log("connection failed",error);
  })
  app.listen(process.env.PORT||8000,()=>{
     console.log(`server is running at port:${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("Mongodb connection error",err);
})
// import { DB_NAME } from "./constants.js";
// import mongoose from "mongoose"
// import express from "express"
// const app=express();
// (async()=>{
//   try {
//     const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log("connection at ",connectionInstance.connection.host);
//     app.on("error",(error)=>{
//       console.log("error",error);
//       throw error
//     })
//     app.listen(process.env.PORT,()=>{
//       console.log(`app is listening at port:http://localhost:${process.env.PORT}`);
//     })
//   } catch (error) {
//     console.error(error);
//     throw error
// })()
