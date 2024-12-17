// Models
import PropertyGoalModel from "../models/propertyGoalModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/property_goal.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    try {
        const PropertyGoal = await PropertyGoalModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyGoal));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const createRecord = async (req, res) => {
    try {
        const newRecord = await PropertyGoalModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_goal_id: newRecord.insertId,
                ...req.validatedData,
            })
        );
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyGoalModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await PropertyGoalModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_goal_id: id,
                ...req.validatedData,
            })
        );
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyGoalModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await PropertyGoalModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await PropertyGoalModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await PropertyGoalModel.create(item.name);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};
