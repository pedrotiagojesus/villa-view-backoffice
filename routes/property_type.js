import express from "express";

// Controller
import {
    listRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    truncate,
    loadData,
} from "../controllers/propertyTypeController.js";

// Middleware
import {
    validateCreateFields,
    validateUpdateFields,
} from "../middleware/validateFields/propertyType.js";

const router = express.Router();

router.get("/", listRecords);
router.post("/", validateCreateFields, createRecord);
router.put("/:id", validateUpdateFields, updateRecord);
router.delete("/:id", deleteRecord);
router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
