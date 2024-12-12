import express from "express";
import { connectionDb } from "../controllers/dbController.js";

const router = express.Router();

router.get("/connection", connectionDb);

export default router;
