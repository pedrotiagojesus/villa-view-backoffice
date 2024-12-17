import CountyModel from "../models/countyModel.js";
import { createApiResponse } from "../utils/response.js";

import dataList from "../data/county.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    const districtId = req.query.districtId;

    if (!districtId) {
        res.status(400).json(
            createApiResponse("error", null, {
                code: "PARAM_MISS",
                message: "O parâmetro districtId é obrigatório.",
            })
        );
        return;
    }

    try {
        const data = await CountyModel.getAll(districtId);
        res.status(200).json(createApiResponse("success", data));
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
        const newRecord = await CountyModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                county_id: newRecord.insertId,
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

export const truncate = async (req, res) => {
    try {
        const truncate = await CountyModel.truncate();
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
            await CountyModel.create(item.district_id, item.name);
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
