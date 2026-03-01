// export const asynchandler=()=>{}
// export const asynchandler=(fn)=>(req,res,next)=>{
//   try { 
//   } catch (error) {
//     res.status(err.code|| 500).json({
//       success:false,
//       message:err.message
//     })
//   }
// }
//using promise method 2
const asynchandler=(fn)=>{
  (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).
    catch((err)=>next(err))
  }
}