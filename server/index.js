import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import User from "./routes/User.js"
import Product from "./routes/Product.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

try {
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Database is connected'))
} catch (error) {
    console.log('Database is error ' + error);
}

app.get("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Server is Working!" 
    })
})

app.use("/api/uploads", express.static("uploads"));

app.use("/api/user", User)
app.use("/api/product", Product)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400;

    if (err.code === '11000') return err.message = "Aready Exist!"
    let message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} . . . `);
})
