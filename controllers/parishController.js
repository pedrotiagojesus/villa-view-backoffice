import ParishModel from "../models/parishModel.js";
import { createApiResponse } from "../utils/response.js";

import dataList from "../data/parish.json" assert { type: "json" };

export const listParish = async (req, res) => {
    const countyId = req.query.countyId;

    if (!countyId) {
        res.status(400).json(
            createApiResponse("error", null, {
                code: "PARAM_MISS",
                message: "O parâmetro countyId é obrigatório.",
            })
        );
        return;
    }

    try {
        const data = await ParishModel.getAll(countyId);
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

export const createParish = async (req, res) => {

    try {
        const newParish = await ParishModel.create(req.body);
        res.status(201).json(createApiResponse("success", newParish));
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
        const truncate = await ParishModel.truncate();
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
            await ParishModel.create(item.county_id, item.name);
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
