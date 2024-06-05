import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
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
    productId: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
    products: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            sellingPrice: {
                type: Number,
                required: true,
            },
            discount: {
                type: Number,
                required: true,
            },
        }
    ],
    address: {
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            min: 10,
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
    discount: {
        type: Number,
        required: true
    },
    razorpay_orderID: {
        type: String,
        required: true
    },
    razorpay_paymentID: {
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