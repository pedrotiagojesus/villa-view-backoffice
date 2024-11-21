import express from "express";
import {
    getProperty,
    listPropertyHighlight,
    listPropertyNew,
    listPropertySearch,
    createProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/highlight/", listPropertyHighlight);
router.get("/new/", listPropertyNew);
router.get("/search/", listPropertySearch);
router.get("/:id", getProperty);
router.post("/", createProperty);

export default router;
