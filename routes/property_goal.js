import express from "express";
import {
    listPropertyGoal,
    createPropertyGoal,
    truncate,
    loadData,
} from "../controllers/propertyGoalController.js";

const router = express.Router();

router.get("/", listPropertyGoal);
router.post("/", createPropertyGoal);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
