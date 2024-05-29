import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    },
    mainImage: {
        type: String,
        required: true,
        default: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    },
    category: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;