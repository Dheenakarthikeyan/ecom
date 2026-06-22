import app from "./app.js";

import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 6000;

connectDB();

process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Server is shutting down , due to uncaugth exception");

    process.exit(1);

})


const Server = app.listen(PORT, () => {
    console.log(`server is running :http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    Server.close(() => {
        process.exit(1);
    })
}) 
