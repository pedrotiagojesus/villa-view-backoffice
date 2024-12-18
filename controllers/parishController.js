// Models
import ParishModel from "../models/parishModel.js";
import DistrictModel from "../models/districtModel.js";
import CountyModel from "../models/countyModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/parish.json" assert { type: "json" };

export const listRecords = async (req, res) => {
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

export const createRecord = async (req, res) => {

    try {

        const {district_id, county_id} = req.validatedData;

        // Find district
        const district = await DistrictModel.get(district_id);

        if (!district) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O district_id fornecido não existe.",
                })
            );
        }

        // Find county
        const county = await CountyModel.get(county_id);

        if (!county) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O county_id fornecido não existe.",
                })
            );
        }

        if (district_id != county.district_id) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O county_id fornecido não pretence ao district_id indicado.",
                })
            );
        }

        const newRecord = await ParishModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                parish_id: newRecord.insertId,
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
        const {district_id, county_id} = req.validatedData;

        // Find record
        const record = await ParishModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        // Find district
        const district = await DistrictModel.get(district_id);

        if (!district) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O district_id fornecido não existe.",
                })
            );
        }

        if (district_id != county.district_id) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O county_id fornecido não pretence ao district_id indicado.",
                })
            );
        }

        // Find county
        const county = await CountyModel.get(county_id);

        if (!county) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "O county_id fornecido não existe.",
                })
            );
        }

        await ParishModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                parish_id: id,
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
        const record = await ParishModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await ParishModel.delete(id);
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
            await ParishModel.create(item.district_id, item.county_id, item.name);
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
