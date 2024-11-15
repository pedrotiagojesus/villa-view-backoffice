import express from "express";
import {
    listPropertyGoal,
    createPropertyGoal,
} from "../controllers/propertyGoalController.js";

const router = express.Router();

router.get("/", listPropertyGoal);
router.post("/", createPropertyGoal);

export default router;
