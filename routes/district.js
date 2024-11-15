import express from "express";
import {
    listDistrict,
    createDistrict,
} from "../controllers/districtController.js";

const router = express.Router();

router.get("/", listDistrict);
router.post("/", createDistrict);

export default router;
