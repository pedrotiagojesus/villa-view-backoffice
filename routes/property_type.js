import express from "express";
import {
    listPropertyType,
    createPropertyType,
    truncate,
    loadData,
} from "../controllers/propertyTypeController.js";

const router = express.Router();

router.get("/", listPropertyType);
router.post("/", createPropertyType);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
