import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    truncate,
    loadData,
} from "../controllers/countyController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createCountySchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createCountySchema), createRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
