import express from "express";

// Controller
import {
    listDistrict,
    create,
    truncate,
    loadData,
} from "../controllers/districtController.js";

// Middleware
import { validateCreateFields } from "../middleware/validateFields/district.js";

const router = express.Router();

router.get("/", listDistrict);
router.post("/", validateCreateFields, create);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
