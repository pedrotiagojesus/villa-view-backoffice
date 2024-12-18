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
        throw new ApiError(
            400,
            `O parâmetro countyId é obrigatório.`,
            "PARAM_MISS"
        );
    }

    try {
        const data = await ParishModel.getAll(countyId);
        res.status(200).json(createApiResponse("success", data));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res) => {
    try {
        const { district_id, county_id } = req.validatedData;

        const [district, county] = await Promise.all([
            verifyRecordExists(DistrictModel, district_id, "district"),
            verifyRecordExists(CountyModel, county_id, "county"),
        ]);

        if (district_id != county.district_id) {
            throw new ApiError(
                400,
                `O county_id fornecido não pretence ao district_id indicado.`,
                "RECORD_NOT_FOUND"
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
        next(error);
    }
};

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { district_id, county_id } = req.validatedData;

        // Find record
        const record = await ParishModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        const [district, county] = await Promise.all([
            verifyRecordExists(DistrictModel, district_id, "district"),
            verifyRecordExists(CountyModel, county_id, "county"),
        ]);

        if (district_id != county.district_id) {
            throw new ApiError(
                400,
                `O county_id fornecido não pretence ao district_id indicado.`,
                "RECORD_NOT_FOUND"
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
        next(error);
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await ParishModel.get(id);

        if (!record) {
            throw new ApiError(
                400,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await ParishModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await ParishModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await ParishModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
