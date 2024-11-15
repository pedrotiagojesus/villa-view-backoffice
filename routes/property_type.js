import express from "express";
import {
    listPropertyType,
    createPropertyType,
} from "../controllers/propertyTypeController.js";

const router = express.Router();

router.get("/", listPropertyType);
router.post("/", createPropertyType);

export default router;
