import express from "express";
import {
    listRecords,
    createParish,
    truncate,
    loadData,
} from "../controllers/parishController.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", createParish);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
