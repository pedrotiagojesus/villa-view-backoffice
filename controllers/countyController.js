// Models
import CountyModel from "../models/countyModel.js";
import DistrictModel from "../models/districtModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
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

        const {district_id} = req.validatedData;

        // Find record
        const district = await DistrictModel.get(district_id);

        if (!district) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O district_id fornecido não existe.",
                })
            );
        }

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

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const {district_id} = req.validatedData;

        // Find record
        const record = await CountyModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        // Find record
        const district = await DistrictModel.get(district_id);

        if (!district) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O district_id fornecido não existe.",
                })
            );
        }

        await CountyModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                county_id: id,
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
        const record = await CountyModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await CountyModel.delete(id);
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
