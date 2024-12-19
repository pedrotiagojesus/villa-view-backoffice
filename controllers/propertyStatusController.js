// Models
import PropertyStatusModel from "../models/propertyStatusModel.js";
import PropertyModel from "../models/propertyModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";
import ApiError from "../utils/ApiError.js";

// Data
import dataList from "../data/property_status.json" assert { type: "json" };

export const listRecords = async (req, res, next) => {
    try {
        const PropertyStatus = await PropertyStatusModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyStatus));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res, next) => {
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

export const updateRecord = async (req, res, next) => {
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

export const deleteRecord = async (req, res, next) => {
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

        // Is in use?
        // Property
        const inUseProperty = await PropertyModel.countByPropertyStatus(id);
        if (inUseProperty > 0) {
            throw new ApiError(
                400,
                `Registo em uso, não pode ser eliminado.`,
                "RECORD_IN_USE"
            );
        }

        // Delete type
        const deleteType = req.header("X-Delete-Type") ?? "soft";

        if (deleteType === "soft") {
            await PropertyStatusModel.softDelete(id);
        } else {
            await PropertyStatusModel.hardDelete(id);
        }

        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res, next) => {
    try {
        const truncate = await PropertyStatusModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res, next) => {
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
