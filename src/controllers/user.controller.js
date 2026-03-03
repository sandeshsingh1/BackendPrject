import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
 // get user details from frontend.. that is  postman
 //validation lagao.. ex -not empty
 // if user already exists..ex username or email
 //check for images... check for avatar
 //upload them to cludinary..,avatar
//create user object -create entry in db
// remove password and refresh token field from response..
// chekc for user creation..
// return response..
//get userinfo from body.. postman se 
console.log(req.body);
const {username,email,fullname,password}=req.body
console.log("email",email); 
// if(fullname===""){
//   throw new ApiError(400,"fullname is required")
// }
// hadling all fields at once.. whether empty ir not..
if(
  [fullname,email,username,password].some((field)=>field.trim()==="")
)
{
   throw new ApiError(400,"All fields are required");
}
//check if username or email exists
const existingUser=await User.findOne(
  {
    $or:[{username},{email}]
  }
)
if(existingUser)
  {
    throw new ApiError(409,"user with email or username exists");
  }
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;
// check for avatar it is compulsory..
if(!avatarLocalPath){
  throw new ApiError(400,"Avatar is a required field");
}
const avatar=await uploadOnCloudinary(avatarLocalPath);
const coverImage=await uploadOnCloudinary(coverImageLocalPath);
 //upload them to cludinary..,avatar
if (!avatar) {
  throw new ApiError(400,"Avatar is a required field");
}
//create user object -create entry in db
const user=await User.create(
  {
    fullname,
    // avatar is already validated...
    avatar:avatar.url,
    // check first whether cover image url is available or not...
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  }
)
const createdUser=await User.findById(user._id).select(
  "-password -refreshToken"
)
if(!createdUser){
  throw new ApiError(500,"Something went wromg while regostering user");
}
return res.status(201).json(
  new ApiResponse(200,createdUser,"User registered succeessfully")
)
})

export default registerUser
