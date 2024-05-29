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

        const cover = req.file.originalname;
        console.log(cover);

        const { name: ProductName, price, description, discount, category } = req.body;

        if (!ProductName || !price || !description || !discount || !mainImage || !category) return res.status(404).json({
            success: false,
            message: "Something is missing!",
        })

        /*    const Product = await Product.create({
                name: ProductName,
                owner: {
                    id: _id,
                    email,
                    name
                },
                price,
                description,
                discount,
                mainImage,
                category
             })  */

        res.status(201).json({
            success: true,
            message: `${createBlog.title} has been created!`,
            data: createBlog._id
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