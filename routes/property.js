import express from "express";
import {
    listProperty,
    listPropertyHighlight,
    listPropertyNew,
    listPropertySearch,
    createProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", listProperty);
router.get("/highlight/", listPropertyHighlight);
router.get("/new/", listPropertyNew);
router.get("/search/", listPropertySearch);
router.post("/", createProperty);

export default router;
