import express from "express";
import {
    listParish,
    createParish,
    truncate,
    loadData,
} from "../controllers/parishController.js";

const router = express.Router();

router.get("/", listParish);
router.post("/", createParish);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
