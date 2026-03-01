import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import uploadOnCloudinary from "./utils/cloudinary.js";

// Optional: test upload once at startup
const startServer = async () => {
  try {
    // Test upload (remove later in production)
    await uploadOnCloudinary("./test.jpg");

    await connectDB();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });

  } catch (error) {
    console.error("Startup error:", error);
  }
};
startServer();

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
