import express from "express";

// Controller
import {
    listRecords,
    listRecordsHighlight,
    listRecordsSearch,
    createRecord,

    getProperty,
} from "../controllers/propertyController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertySchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.get("/highlight/", listRecordsHighlight);
router.get("/search/", listRecordsSearch);
router.post("/", validate(createPropertySchema), createRecord);

/*
router.get("/:id", getProperty);
*/

export default router;
