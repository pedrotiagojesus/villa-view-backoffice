import express from "express";

// Controller
import {
    listPropertyGoal,
    createRecord,
    updateRecord,
    truncate,
    loadData,
} from "../controllers/propertyGoalController.js";

// Middleware
import {
    validateCreateFields,
    validateUpdateFields,
} from "../middleware/validateFields/propertyGoal.js";

const router = express.Router();

router.get("/", listPropertyGoal);
router.post("/", validateCreateFields, createRecord);
router.put("/:id", validateUpdateFields, updateRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
