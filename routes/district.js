import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    truncate,
    loadData,
} from "../controllers/districtController.js";

// Middleware
import validate from "../middleware/validate.js";

// Schema
import { createDistrictSchema } from "../schemas/index.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validate(createDistrictSchema), createRecord);
router.put("/:id", validate(createDistrictSchema), updateRecord);
router.delete("/:id", deleteRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
