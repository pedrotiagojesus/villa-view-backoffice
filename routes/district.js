import express from "express";

// Controller
import {
    listDistrict,
    create,
    update,
    truncate,
    loadData,
} from "../controllers/districtController.js";

// Middleware
import { validateCreateFields, validateUpdateFields } from "../middleware/validateFields/district.js";

const router = express.Router();

router.get("/", listDistrict);
router.post("/", validateCreateFields, create);
router.put("/:id", validateUpdateFields, update);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
