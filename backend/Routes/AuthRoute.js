
import express from "express";
import { loginUser } from "../Controllers/AuthController.js";

const router = express.Router()

router.post('/authenticate', loginUser)

export default router

