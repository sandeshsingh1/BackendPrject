import { application } from "express";
class ApiResponse{
  constructor(statuscode,data=null,message="success")
  {
         this.statuscode=statuscode;
         this.message=message;
         this.success=true;
         this.data=data;
  }
}
export default ApiResponse;