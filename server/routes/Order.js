import express from "express";
import Order from '../models/Order.js';
import verifyUser from "../utils/VerifyUser.js";
import Razorpay from "razorpay"
import crypto from "crypto"
import ErrorHandler from "../utils/ErrorHandler.js";

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

export default routes;