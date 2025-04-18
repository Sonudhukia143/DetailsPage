import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    console.log("Auth Middleware Called");
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_SECRET);
        if(!decoded) return res.status(401).json({ message: "Token is not valid" });

        const user = await User.findById(decoded.id).select("-password"); // Exclude the password field
        if(!user) res.status(401).json({ "message":"User Not Found"})

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;