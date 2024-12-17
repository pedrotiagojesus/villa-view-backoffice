import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    truncate,
    loadData,
} from "../controllers/propertyStatusController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertyStatusSchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createPropertyStatusSchema), createRecord);
router.put("/:id", validate(createPropertyStatusSchema), updateRecord);
router.delete("/:id", deleteRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
