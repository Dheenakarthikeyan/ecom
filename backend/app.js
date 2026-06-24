import express from "express"


import product from "./router/productRouter.js";
import user from "./router/userRouter.js"
import orderRouter from "./router/orderRoutes.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

//router

app.use("/api/v1/",product);
app.use("/api/v1/",user)
app.use("/api/v1", orderRouter);
app.use(errorMiddleware);


export default app;