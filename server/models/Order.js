import mongoose from "mongoose";
import Product from "./Product";

const OrderSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    products: [
        {
            ProductId: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quentity: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            }
        }
    ],
    address: {
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            max: 10,
            required: true
        },
        pin: {
            type: Number,
            min: 6,
            required: true
        },
        addressWild: {
            type: String,
            required: true
        },
        town: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        of: {
            type: String,
            required: true
        },
    },
    amount: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("Order", OrderSchema);
export default Order;