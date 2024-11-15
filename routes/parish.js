import express from "express";
import { listParish, createParish } from "../controllers/parishController.js";

const router = express.Router();

router.get("/", listParish);
router.post("/", createParish);

export default router;
