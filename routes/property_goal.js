import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    truncate,
    loadData,
} from "../controllers/propertyGoalController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createPropertyGoalSchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createPropertyGoalSchema), createRecord);
router.put("/:id", validate(createPropertyGoalSchema), updateRecord);
router.delete("/:id", deleteRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
