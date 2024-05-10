import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config()

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";

app.use(express.json()); // allows to extract req.body

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    connectToMongoDb();
    console.log(`Server is running ${PORT}`);
})