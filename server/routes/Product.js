import express from "express"
import Product from "../models/Product.js";
import verifyUser from "../utils/VerifyUser.js";
import { upload } from "../utils/Multer.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const router = express.Router();

router.post("/create", verifyUser, upload.single("cover"), async (req, res, next) => {
    try {
        const { _id, name, role, email } = req.user;

        if (role == "user") return res.status(401).json({
            message: "UnAuthorized User!",
            status: false
        })

        const cover = req.file;
        console.log(req.body);

        const { name: ProductName, price, description, stock, discount, category } = req.body;

        if (!ProductName || !price || !description || !discount || !category) return res.status(404).json({
            success: false,
            message: "Something is missing!",
        })

        const product = await Product.create({
            name: ProductName,
            owner: {
                id: _id,
                email,
                name
            },
            price,
            stock,
            description,
            discount,
            mainImage: cover.path,
            category
        })

        res.status(201).json({
            success: true,
            message: `${product.name} has been created!`,
            data: product._id
        })

    } catch (error) {
        next(error);
    }
})

router.get("/get/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.status(200).json({
            success: true,
            message: "Got The Blog",
            data: product
        })

    } catch (error) {
        next(error);
    }
})

router.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {

        const { id } = req.params;
        const deleteProject = await Product.findById(id);

        if (!deleteProject) return ErrorHandler(404, "Product Not Found!");

        // const product = await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "",
            // data: product
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/all", async (req, res, next) => {
    try {

        const ProductData = await Product.find();

        let data = [];

        ProductData.map(i => {
            data.push({
                _id: i._id,
                name: i.name,
                mainImage: i.mainImage,
                discount: i.discount,
                price: i.price,
                stock: i.stock
            })
        })

        res.status(200).json({
            message: "Product has been Fetched!",
            success: true,
            data
        })

    } catch (error) {
        next(error);
    }
})

export default router