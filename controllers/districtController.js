// Models
import DistrictModel from "../models/districtModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/distric.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    try {
        const district = await DistrictModel.getAll();
        res.status(200).json(createApiResponse("success", district));
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
        const { name } = req.body;

        const newRecord = await DistrictModel.create(name);

        res.status(201).json(
            createApiResponse("success", {
                district_id: newRecord.insertId,
                name,
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
        const { name } = req.body;

        // Find record
        const record = await DistrictModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await DistrictModel.update(id, name);
        res.status(201).json(
            createApiResponse("success", {
                district_id: id,
                name,
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
        const record = await DistrictModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await DistrictModel.delete(id);
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
        const truncate = await DistrictModel.truncate();
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
            await DistrictModel.create(item.name);
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
