import express from "express";
import {
    listProperty,
    listPropertyHighlight,
    createProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/highlight/", listPropertyHighlight);
router.get("/", listProperty);
router.post("/", createProperty);

export default router;
