import express from "express";
import { listCounty, createCounty } from "../controllers/countyController.js";

const router = express.Router();

router.get("/", listCounty);
router.post("/", createCounty);

export default router;
