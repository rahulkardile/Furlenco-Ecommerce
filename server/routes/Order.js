import express, { Router } from "express";
import Order from '../models/Order.js';
import verifyUser from "../utils/VerifyUser.js";
import Razorpay from "razorpay"
import fs from "fs"
import ErrorHandler from "../utils/ErrorHandler.js";
import easyinvoice from "easyinvoice";
import puppeteer from "puppeteer";
import path from 'path';
const __dirname = path.resolve();

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

        const getData = await Order.find({ UserId: _id }).select(["products", "amount", "discount", "address", "_id", "UserId"]).populate({ path: "productId", model: "Product", select: ['name', 'price', 'mainImage', '_id'] })

        res.status(200).json({
            success: true,
            data: getData
        });

    } catch (error) {
        next(error);
    }
})

routes.get("/invoice/:id", verifyUser, async (req, res, next) => {
    try {

        const id = req.params.id;
        const Data = await Order.findById(id);

        let product = [];

        await Data.products.map(i => {
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

        // await easyinvoice.createInvoice(data, async function (result) {
        //     fs.writeFileSync("invoice.pdf", result.pdf, "base64")
        //     console.log("Created!");
        // });

        const fileName = "invoice.pdf"

        if (!fs.existsSync(fileName)) {
            return res.status(404).json({
                "statusCode": 404,
                "message": "File not found"
            })
        }

        res.status(200).download('./invoice.pdf');

    } catch (error) {
        next(error);
    }
})

routes.get("/generate-invoice/:id", verifyUser, async (req, res, next) => {
    try {

        const { id } = req.params;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // dynamic Generation
        //${req.protocol}://${req.get('host')} 
        await page.goto(`http://localhost:5000/views/invoice/${id}`, {
            waitUntil: "networkidle0"
        });

        await page.setViewport({
            width: 1680,
            height: 1050
        })

        const today = new Date();
        console.log("before path");

        // genarating the pdf
        const pdf = await page.pdf({
            path: 'result.pdf',
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
        });

        console.log("next to from path");

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdf.length,
        })

        res.download("result.pdf");

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