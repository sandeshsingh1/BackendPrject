import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";//see cookie parser
const app=express();
app.use(cors(
{
  origin:process.env.CORS_ORIGIN// kaun se origin  wali request allowed honge 
  ,
}
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
export {app}