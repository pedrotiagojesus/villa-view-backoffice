import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    truncate,
    loadData,
} from "../controllers/propertyStatusController.js";

// Middleware
import { validateCreateFields } from "../middleware/validateFields/propertyStatus.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validateCreateFields, createRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
