import HandleError from "./hadleError.js";
import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js";


export const verifyUser = async(req,res,next) => {

    const {token} = req.cookies;



    if(!token){
        return next(new HandleError("Access denined please login"));
    }else{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decode) //finding user id

        req.user = await userModel.findById(decode?.id);//set

        console.log(req.User)

         next();
 
    }
  
}

export const roleBasedAccess = (roles) => {
  return (req, res, next) => {

    console.log(req.user); // debug

    if (!req.user) {
      return next(new HandleError("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};