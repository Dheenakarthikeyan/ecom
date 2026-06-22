import HandleError from "../helper/hadleError.js";

const errorMiddleware = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Duplicate key error mongoDB
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];

        const message = `${field} '${value}' is already registered`;
        err = new HandleError(message, 400);
    }

    const overnet = "karthikeyan";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        overnet
    });
};

export default errorMiddleware;