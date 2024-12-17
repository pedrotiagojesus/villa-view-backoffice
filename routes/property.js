import express from "express";

// Controller
import {
    getRecord,
    listRecords,
    listRecordsHighlight,
    listRecordsSearch,
    createRecord,
    deleteRecord,
} from "../controllers/propertyController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertySchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.get("/:id", getRecord);
router.get("/highlight/", listRecordsHighlight);
router.get("/search/", listRecordsSearch);
router.post("/", validate(createPropertySchema), createRecord);
router.delete("/:id", deleteRecord);

export default router;
