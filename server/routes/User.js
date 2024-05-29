import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/ErrorHandler.js";
import verifyUser from "../utils/VerifyUser.js";

const router = express.Router();

const expiry = 1000 * 60 * 60 * 24 * 300;

router.post("/new", async (req, res, next) => {
    try {

        const { name, role, email, ProfileIMG, DOB, gender, password } = req.body;

        if (!name, !email, !password, !DOB, !gender) return next(ErrorHandler(401, "Some Fields Are Missing!"));

        const hash = await bcrypt.hashSync(password, 10)

        const NewUser = await User.create({
            name,
            email,
            ProfileIMG,
            DOB,
            password: hash,
            gender
        })

        res.status(200).json(`Welcome ${NewUser.name}`)

    } catch (error) {
        next(error)
    }
})

router.post("/get", async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            if (!email) {
                next(ErrorHandler(404, "Email is Missing!"))
            }
            if (!password) {
                next(ErrorHandler(404, "Password is Missing!"))
            }
        }

        const GetUser = await User.findOne({
            email
        })

        if (!GetUser) {
            next(ErrorHandler(404, "Please Provide Valid Credencials!"))
        }

        const passOk = bcrypt.compareSync(password, GetUser.password);
        if (!passOk) return next(ErrorHandler(400, "Wrong password!"));

        const { password: pass, createdAt, updatedAt, __v, ...rest } = GetUser._doc

        const access_user = jwt.sign({ _id: rest._id, name: rest.name, email: rest.email, role: rest.role }, process.env.JWT_SECRET);

        res.cookie("access_furlenco", access_user, { secure: true, maxAge: expiry }).status(200).json({
            success: true,
            message: `Welcome Back ${GetUser.name}`,
            data: rest
        })

    } catch (error) {
        next(error);
    }
})

router.get("/verify", verifyUser, async (req, res, next) => {
    try {

        const user = req.user;
        console.log("verification is completed");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User is verified",
            user
        })

    } catch (error) {
        next(error);
    }
})

router.get("/logout", (req, res) => {
    try {

        res.clearCookie('access_furlenco');
        res.status(200).json({
            message: "Logout Success!",
            success: true
        })

    } catch (error) {
        next(error);
    }
})

export default router;