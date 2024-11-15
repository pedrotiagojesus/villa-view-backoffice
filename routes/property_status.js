import express from "express";
import {
    listPropertyStatus,
    createPropertyStatus,
} from "../controllers/propertyStatusController.js";

const router = express.Router();

router.get("/", listPropertyStatus);
router.post("/", createPropertyStatus);

export default router;
