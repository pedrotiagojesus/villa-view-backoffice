import express from "express";

// Controller
import {
    listRecords,
    listRecordsHighlight,
    createRecord,

    getProperty,
    listPropertySearch,
} from "../controllers/propertyController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertySchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.get("/highlight/", listRecordsHighlight);
router.post("/", validate(createPropertySchema), createRecord);

/*
router.get("/search/", listPropertySearch);
router.get("/:id", getProperty);
*/

export default router;
