import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    truncate,
    loadData,
} from "../controllers/parishController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createParishSchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createParishSchema), createRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
