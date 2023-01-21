import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_KEY;

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[0];
        if(token) {
            jwt.verify(token, secretKey, (error, valid) => {
                if(error) {
                    res.status(400).json("Invalid token");
                } else {
                    next();
                }
            });
        } else {
            res.status(404).json("please provide token");
        }
    } catch (error) {
        console.log(error);
    }
};

export default authMiddleWare;