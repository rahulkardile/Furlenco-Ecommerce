import express from "express";
import Order from '../models/Order.js';
import Razorpay from "razorpay";
import verifyUser from "../utils/VerifyUser.js";
import crypto from "crypto"
import ErrorHandler from "../utils/ErrorHandler.js";

const routes = express.Router();

routes.post("/checkout", verifyUser, async (req, res, next) => {
    try {

        const { amount } = req.body;

        if (!amount) {
            return next(ErrorHandler(400, "Amount is Required!"));
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })

        const options = {
            amount: Number(amount * 10),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                next(error);
            } else {
                res.status(200).json({
                    success: true,
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
            shippingInfo,
            amount,
            discount
         } = req.body;

         console.log(req.body);

    } catch (error) {
        next(error);
    }
})

export default routes;