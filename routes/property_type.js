import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    truncate,
    loadData,
} from "../controllers/propertyTypeController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertyTypeSchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createPropertyTypeSchema), createRecord);
router.put("/:id", validate(createPropertyTypeSchema), updateRecord);
router.delete("/:id", deleteRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
