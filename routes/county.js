import express from "express";
import {
    listCounty,
    createCounty,
    truncate,
    loadData,
} from "../controllers/countyController.js";

const router = express.Router();

router.get("/", listCounty);
router.post("/", createCounty);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
