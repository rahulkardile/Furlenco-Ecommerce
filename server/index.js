import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import easyinvoice from "easyinvoice"
import path from "path"

import User from "./routes/User.js"
import Product from "./routes/Product.js"
import OrderRoute from "./routes/Order.js"
import Order from "./models/Order.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

// seting ejs engine
app.set("view engine", "ejs");

// setting where our ejs are
app.set("views", path.resolve("./views"));

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
app.use("/api/order", OrderRoute);

app.get("/views/invoice/:id", async (req, res, next) => {
    try {

        const { id } = req.params;
        const data = await Order.findById(id);

        const date = new Date();
        let currentDate = date.toDateString()

        return res.render("Invoice", {
            name: data.address.name,
            mobile: data.address.mobile,
            town: data.address.town,
            address: data.address.addressWild,
            products: data.products,
            total: data.amount,
            date: currentDate
        })

    } catch (error) {
        next(error);
    }
})

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
