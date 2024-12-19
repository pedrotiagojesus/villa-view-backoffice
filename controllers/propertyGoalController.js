// Models
import PropertyGoalModel from "../models/propertyGoalModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";
import ApiError from "../utils/ApiError.js";

// Data
import dataList from "../data/property_goal.json" assert { type: "json" };

export const listRecords = async (req, res, next) => {
    try {
        const PropertyGoal = await PropertyGoalModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyGoal));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res, next) => {
    try {
        const newRecord = await PropertyGoalModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_goal_id: newRecord.insertId,
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
        const record = await PropertyGoalModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
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
        next(error);
    }
};

export const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyGoalModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        // TODO: Arranjar maneira de fazer um soft delete e um hard delete
        // TODO: Garantir que o primary key desta tabela não está em uso noutras tabelas

        await PropertyGoalModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res, next) => {
    try {
        const truncate = await PropertyGoalModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res, next) => {
    try {
        for (const item of dataList) {
            await PropertyGoalModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
