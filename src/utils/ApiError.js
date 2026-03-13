class ApiError extends Error{
  constructor(
    statusCode,
    message="Something went wrong",
    errors=[],
    stack=""
  )
  {
    super(message);
    this.statusCode=statusCode;
    this.data=null;
    // this.message=message; already set by super(meassage)
    this.success=false;
    this.errors=errors;
    if(stack){
      this.stack=stack;
    }
      else{
             Error.captureStackTrace(this,this.constructor);
      }
    }
  }
  export default ApiError;
// Short answer: Haan, positional parameters me order important hota hai.
// Agar constructor parameters is order me defined hain:

// constructor(
//   statusCode,
//   message = "Something went wrong",
//   errors = [],
//   stack = ""
// )
// 3. Error.captureStackTrace(this, this.constructor)

// Ye line Node.js ko bolti hai:

// Stack trace yaha se start karo, constructor ko ignore karo.

// Error.captureStackTrace(this, this.constructor);

// Meaning:

// this → error object

// this.constructor → ApiError class

// To stack trace ApiError constructor ko skip karega.

// 4. Result (clean stack trace)

// Ab output aisa hoga:

// ApiError: Avatar is required
//     at registerUser (user.controller.js:45:10)

// Notice:

// ❌ at new ApiError line gayab ho gayi.