import DistrictModel from "../models/districtModel.js";
import { createApiResponse } from "../utils/response.js";

import dataList from "../data/distric.json" assert { type: 'json' };

export const listDistrict = async (req, res) => {
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

export const createDistrict = async (req, res) => {
    try {
        const newDistrict = await DistrictModel.create(req.body);
        res.status(201).json(createApiResponse("success", newDistrict));
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
