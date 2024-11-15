import express from "express";
import {
    listProperty,
    createProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", listProperty);
router.post("/", createProperty);

export default router;
