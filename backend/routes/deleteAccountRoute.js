import { Router } from "express";
import deleteAccount from "../controllers/deleteAccount.js";
import authMiddleware from "../middlewares/checkAuth.js";

const router = Router();

router.delete("/", authMiddleware, deleteAccount);

export default router;