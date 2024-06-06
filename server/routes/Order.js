import express, { Router } from "express";
import Order from '../models/Order.js';
import verifyUser from "../utils/VerifyUser.js";
import Razorpay from "razorpay"
import fs from "fs"
import ErrorHandler from "../utils/ErrorHandler.js";
import easyinvoice from "easyinvoice";

const routes = express.Router();

routes.post("/checkout", verifyUser, async (req, res, next) => {
    try {
        const { amount } = req.body;

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })

        if (!amount) {
            return next(ErrorHandler(400, "Amount is Required!"));
        }
        const options = {
            currency: "INR",
            amount: Number(amount * 100),
            receipt: "receipt1",
            payment_capture: 0
        }

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                next(error);
            } else {
                res.status(200).json({
                    success: true,
                    key: process.env.KEY_ID,
                    order
                })
            }
        })

    } catch (error) {
        next(error);
    }
})

routes.post("/verify", verifyUser, async (req, res, next) => {
    try {

        const { _id, name, email } = req.user;
        const {
            razorpay_orderID,
            razorpay_paymentID,
            razorpay_signature,
            products,
            address,
            productId,
            amount,
            discount
        } = req.body;

        const newOrder = await Order.create({
            address,
            amount,
            discount,
            products,
            razorpay_orderID,
            address,
            razorpay_paymentID,
            signature: razorpay_signature,
            UserId: _id,
            productId,
            user: {
                id: _id,
                name,
                email
            }
        })

        res.status(200).json({
            success: true,
            message: "Order has been placed!"
        })

    } catch (error) {
        next(error);
        console.log(error);
    }
})

routes.get("/myorder", verifyUser, async (req, res, next) => {
    try {
        const { _id, name, email } = req.user;

        if (!name) return next(ErrorHandler(401, "User Not Signed In!"))

        const user = {
            id: _id,
            name,
            email
        }

        const getData = await Order.find({ UserId: _id }).select(["products", "amount", "discount", "address", "_id", "UserId"]).populate({ path: "productId", model: "Product", select: ['name', 'price', 'mainImage', '_id'] })

        res.status(200).json(getData);

    } catch (error) {
        next(error);
    }
})

routes.get("/invoice/:id", verifyUser, async (req, res, next) => {
    try {

        const id = req.params.id;
        const Data = await Order.findById(id);

        let product = [];

        Data.products.map(i => {
            product.push({
                "description": i.name,
                "quantity": i.quantity,
                "price": i.sellingPrice,
            })
        })

        var data = {
            "currency": "INR",
            "taxNotation": "vat",
            "marginTop": "25",
            "marginRight": "25",
            "marginLeft": "25",
            "marginBottom": "25",
            "logo": "https://assets.furlenco.com/s3-furlenco-images/grogu/Furlenco2.0_LOGO-EMBLEM-LOW-25.png",
            "sender": {
                "company": "FURLENCO",
                "address": "Maharashtra, Pune, Kothrud",
                "city": "Pune",
                "country": "India"
            },
            "client": {
                "company": Data.user.name,
                "address": Data.address.addressWild,
                "city": Data.address.city,
                "country": Data.address.state
            },
            "invoiceNumber": "2020.0011",
            "invoiceDate": new Date().toJSON().slice(0, 10),
            "products": product,
            "bottomNotice": "Thank you For Buying Products From Our Site!"
        }

        await easyinvoice.createInvoice(data, async function (result) {
            fs.writeFileSync("invoice.pdf", result.pdf, "base64")
            console.log("Created!");
        });

        res.status(200).json({
            success: true,
            message: "Invoice Has been Created!"
        })

    } catch (error) {
        next(error);
    }
})

routes.get("/allorders", verifyUser, async (req, res, next) => {
    try {

        const { _id, name, email } = req.user;
        const user = {
            id: _id,
            name,
            email
        }
        const getData = await Order.find();
        res.status(200).json(getData);

    } catch (error) {
        next(error);
    }
})

export default routes;