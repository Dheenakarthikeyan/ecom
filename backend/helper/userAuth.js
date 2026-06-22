import HandleError from "./hadleError.js";
import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js";

/*
export const verifyUser = async(req,res,next) => {

    const {token} = req.cookies;



    if(!token){
        return next(new HandleError("Access denined please login"));
    }else{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decode) //finding user id

        req.User = await userModel.findById(decode.id);//set

        console.log(req.User)

         next();
 
    }
  
}*/
export const verifyUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new HandleError("Access denied, please login", 401));
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("Decoded:", decode);

        const user = await userModel.findById(decode.id);

        if (!user) {
            return next(new HandleError("User not found", 404));
        }

        req.user = user; // ✅ FIXED

        console.log("User:", req.user);

        next();
    } catch (error) {
        return next(new HandleError("Invalid token", 401));
    }
};
//["admin","superadmin"] ...role

export const roleBasedAccess = (roles) => {

    return (req,res,next) => {

        console.log(req.User.role)
        if(!roles.includes(req.User.role)){
            return next( new HandleError( `Role ${req.User.role} is not allowed to access this resource`,403))
        }

         next();
    }

   
}