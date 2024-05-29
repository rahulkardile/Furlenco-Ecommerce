import express from "express"
import Product from "../models/Product.js";
import verifyUser from "../utils/VerifyUser.js";
import { upload } from "../utils/Multer.js";

const router = express.Router();

router.post("/create", verifyUser, upload.single("cover"), async (req, res, next) => {
    try {
        const { _id, name, role } = req.user;

        if (role == "user") return res.status(401).json({
            message: "UnAuthorized User!",
            status: false
        })

        const cover = req.file;
        console.log("image is : ", cover);

        const { name: ProductName, price, description, discount, category } = req.body;

        if (!ProductName || !price || !description || !discount || !category) return res.status(404).json({
            success: false,
            message: "Something is missing!",
        })

        const Product = await Product.create({
            name: ProductName,
            owner: {
                id: _id,
                email,
                name
            },
            price,
            description,
            discount,
            mainImage: cover.path,
            category
        })

        console.log(req.body)

        res.status(201).json({
            success: true,
            message: `${name} has been created!`,
            data: "okk"
        })

    } catch (error) {
        next(error);
    }
})

router.get("/get/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const Product = await Product.findById(id);

        res.status(200).json({
            success: true,
            message: "Got The Blog",
            data: blog
        })

    } catch (error) {
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
                title: i.title,
                poster: i.MainPoster,
                summary: i.summary,
                auther: {
                    id: i.auther.id,
                    name: i.auther.name
                },
            })
        })

        res.status(200).json({
            message: "Got All Blog's",
            success: true,
            blog: data
        })

    } catch (error) {
        next(error);
    }
})

export default router