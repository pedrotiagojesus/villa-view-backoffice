import express from "express";
import {
    listRecords,
    createPropertyType,
    truncate,
    loadData,
} from "../controllers/propertyTypeController.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", createPropertyType);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
