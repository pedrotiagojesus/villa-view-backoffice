import express from "express";
import {
    listPropertyStatus,
    createPropertyStatus,
    truncate,
    loadData,
} from "../controllers/propertyStatusController.js";

const router = express.Router();

router.get("/", listPropertyStatus);
router.post("/", createPropertyStatus);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
