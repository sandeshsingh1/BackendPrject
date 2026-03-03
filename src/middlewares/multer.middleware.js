import multer from "multer";
const storage=multer.diskStorage(
  {
       destination:function(req,file,cb){
        cb(null,"./public/temp")
       },
       filename:function(req,file,cb){
        cb(null, file.originalname)
       }
  }
)
export const upload=multer(
  {
    storage:storage
  }
)
// ❌ Problem 1: File Overwrite Risk

// If two users upload:

// image.png

// Second upload will overwrite first file.

// ✅ Better Approach:
// filename: function(req, file, cb){
//    cb(null, Date.now() + "-" + file.originalname)
// }
// ❌ Problem 2: No File Validation

// Right now, anyone can upload:

// .exe

// .js

// malicious scripts
// You should add fileFilter.
// ❌ Problem 3: No Size Limit
// Someone can upload a 2GB file and crash your server.
// const storage=multer.diskStorage(
//   {
//     destination:function(req,file,cb)
//     {
//         cb(null,"./public/temp")
//     },
//     filename:function(){
//        cb(null,Date.now()+"-"+file.originalname)
//     }
//   }
// );
// const filter=function(req,file,cb){
//    if(file.mimetype.startswith("image/")){
//     cb(null,true);
//    }
//     else{
//       cb(new Error("only images allowed"),false);
//     }
// }
// export const upload=multer(
//   {
//     storage,
//     fileFilter,
//     limits:{
//       fileSize:5*1024*1024//only 5 mb allowed 
//     }
//   }
// )
