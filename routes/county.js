import express from "express";
import {
    listRecords,
    createCounty,
    truncate,
    loadData,
} from "../controllers/countyController.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", createCounty);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
