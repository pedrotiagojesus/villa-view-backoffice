import express from "express";
import {
    listRecords,
    createPropertyStatus,
    truncate,
    loadData,
} from "../controllers/propertyStatusController.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", createPropertyStatus);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
