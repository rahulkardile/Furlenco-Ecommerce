
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ProfileIMG: {
        type: String,
        default: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6
    },
    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user",
        required: false
    },
    DOB: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema);

export default User;
