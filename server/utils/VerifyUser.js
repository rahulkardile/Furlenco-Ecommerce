import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";

const verifyUser = (req, res, next) => {

    const token = req.cookies.access_furlenco;
    if (!token) return next(ErrorHandler(401, "UNAUTHORIZED!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(ErrorHandler(403, "Bad Cookies!"));

        req.user = user;
        next();
    })
}

export default verifyUser;