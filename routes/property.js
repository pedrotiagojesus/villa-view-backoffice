import express from "express";

// Controller
import {
    createRecord,

    getProperty,
    listPropertyHighlight,
    listPropertyNew,
    listPropertySearch,
} from "../controllers/propertyController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertySchema } from "../schemas/index.js";

const router = express.Router();

// router.post("/", validateCreateFields, createRecord);
router.post("/", validate(createPropertySchema), createRecord);

/*
router.get("/highlight/", listPropertyHighlight);
router.get("/new/", listPropertyNew);
router.get("/search/", listPropertySearch);
router.get("/:id", getProperty);
*/

export default router;
