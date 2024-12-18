// Models
import PropertyStatusModel from "../models/propertyStatusModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/property_status.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    try {
        const PropertyStatus = await PropertyStatusModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyStatus));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res) => {
    try {
        const newRecord = await PropertyStatusModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_status_id: newRecord.insertId,
                ...req.validatedData,
            })
        );
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyStatusModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await PropertyStatusModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_goal_id: id,
                ...req.validatedData,
            })
        );
    } catch (error) {
        next(error);
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyStatusModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await PropertyStatusModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await PropertyStatusModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await PropertyStatusModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
