import express from "express";

// Controller
import {
    listPropertyGoal,
    createRecord,
    truncate,
    loadData,
} from "../controllers/propertyGoalController.js";

// Middleware
import { validateCreateFields } from "../middleware/validateFields/propertyGoal.js";

const router = express.Router();

router.get("/", listPropertyGoal);
router.post("/", validateCreateFields, createRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
