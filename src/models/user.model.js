import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema
({
  username:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true,
    index:true//make it searchable..
  },
 email:{
     type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true,
 },
 fullname:{
     type:String,
    required:true,
    lowercase:true,
    trim:true,
    index:true
 },
 avatar:{
  type:String,//cloudinary url lenge..
  required:true
 },
 coverImage:{
   type:String,//cloudibnary url
 },
 watchHistory:[
  {
  type:Schema.Types.ObjectId,
  ref:"Video"
  }
 ],
 password:{
  type:String,
  required:[true,"Password is required"]
 },
 refreshToken:{
  type:String
 }
},{timestamps:true})
// function use kiyaa hai not callback kyunki hame userScema ka accesss chahiye...
userSchema.pre("save",async function(){
  //e br bar save krte time hasing karega jo nhi chhaiye isliye isModified use kro  
  if(!this.isModified("password")) return ;// if  a password modify nahi hua hai to....
    this.password=await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken= function(){
 return jwt.sign(
   {
     _id: this.id,
     email: this.email,
     username: this.username,
     fullname: this.fullname
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
   }
 )
}
userSchema.methods.generateRefreshToken= function(){
 return jwt.sign(
   {
     _id: this.id,
     email: this.email,
     username: this.username,
     fullname: this.fullname
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
     expiresIn: process.env.REFRESH_TOKEN_EXPIRY
   }
 ) 
}
export const  User=mongoose.model("User",userSchema);
