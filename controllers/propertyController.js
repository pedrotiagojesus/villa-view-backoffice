// Models
import PropertyModel from "../models/propertyModel.js";
import DistrictModel from "../models/districtModel.js";
import CountyModel from "../models/countyModel.js";
import ParishModel from "../models/parishModel.js";
import PropertyGoalModel from "../models/propertyGoalModel.js";
import PropertyStatusModel from "../models/propertyStatusModel.js";
import PropertyTypeModel from "../models/propertyTypeModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";
import { verifyRecordExists } from "../utils/verifyRecordExists.js";
import ApiError from "../utils/ApiError.js";

export const getRecord = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        res.status(200).json(createApiResponse("success", record));
    } catch (error) {
        next(error);
    }
};

export const listRecords = async (req, res, next) => {
    try {
        const properties = await PropertyModel.getAll();
        res.status(200).json(createApiResponse("success", properties));
    } catch (error) {
        next(error);
    }
};

export const listRecordsHighlight = async (req, res, next) => {
    try {
        const properties = await PropertyModel.getAll(true);
        res.status(200).json(createApiResponse("success", properties));
    } catch (error) {
        next(error);
    }
};

export const listRecordsSearch = async (req, res, next) => {
    const price_min = req.query.price_min;
    const price_max = req.query.price_max;
    const district_id = req.query.district_id;
    const county_id = req.query.county_id;
    const parish_id = req.query.parish_id;
    const property_type_id = req.query.property_type_id;
    const property_goal_id = req.query.property_goal_id;
    const property_status_id = req.query.property_status_id;
    const room = req.query.room;

    try {
        const properties = await PropertyModel.getAll(
            null,
            price_min,
            price_max,
            district_id,
            county_id,
            parish_id,
            property_type_id,
            property_goal_id,
            property_status_id,
            room
        );
        res.status(200).json(createApiResponse("success", properties));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res, next) => {
    try {
        const {
            reference,
            district_id,
            county_id,
            parish_id,
            property_goal_id,
            property_status_id,
            property_type_id,
        } = req.validatedData;

        const [
            district,
            county,
            parish,
            property_goal,
            property_status,
            property_type,
        ] = await Promise.all([
            verifyRecordExists(DistrictModel, district_id, "district"),
            verifyRecordExists(CountyModel, county_id, "county"),
            verifyRecordExists(ParishModel, parish_id, "parish"),
            verifyRecordExists(
                PropertyGoalModel,
                property_goal_id,
                "property_goal"
            ),
            verifyRecordExists(
                PropertyStatusModel,
                property_status_id,
                "property_status"
            ),
            verifyRecordExists(
                PropertyTypeModel,
                property_type_id,
                "property_type"
            ),
        ]);

        if (district_id != county.district_id) {
            throw new ApiError(
                400,
                `O county_id fornecido não pretence ao district_id indicado.`,
                "RECORD_NOT_FOUND"
            );
        }

        if (county_id != parish.county_id) {
            throw new ApiError(
                400,
                `O parish_id fornecido não pretence ao county_id indicado.`,
                "RECORD_NOT_FOUND"
            );
        }

        if (PropertyModel.preventDuplicate(reference)) {
            throw new ApiError(
                409,
                `Referência duplicada`,
                "RECORD_DUPLICATE"
            );
        }

        const newRecord = await PropertyModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_id: newRecord.insertId,
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
        const {
            reference,
            district_id,
            county_id,
            parish_id,
            property_goal_id,
            property_status_id,
            property_type_id,
        } = req.validatedData;

        // Find record
        const record = await PropertyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        const mergedData = { ...record, ...req.validatedData };

        const [
            district,
            county,
            parish,
            property_goal,
            property_status,
            property_type,
        ] = await Promise.all([
            verifyRecordExists(DistrictModel, district_id, "district"),
            verifyRecordExists(CountyModel, county_id, "county"),
            verifyRecordExists(ParishModel, parish_id, "parish"),
            verifyRecordExists(
                PropertyGoalModel,
                property_goal_id,
                "property_goal"
            ),
            verifyRecordExists(
                PropertyStatusModel,
                property_status_id,
                "property_status"
            ),
            verifyRecordExists(
                PropertyTypeModel,
                property_type_id,
                "property_type"
            ),
        ]);

        if (district_id != county.district_id) {
            throw new ApiError(
                400,
                `O county_id fornecido não pretence ao district_id indicado.`,
                "RECORD_NOT_FOUND"
            );
        }

        if (county_id != parish.county_id) {
            throw new ApiError(
                400,
                `O parish_id fornecido não pretence ao county_id indicado.`,
                "RECORD_NOT_FOUND"
            );
        }

        if (preventDuplicate(reference, id)) {
            throw new ApiError(
                409,
                `Referência duplicada`,
                "RECORD_DUPLICATE"
            );
        }

        await PropertyModel.update(id, mergedData);
        res.status(201).json(
            createApiResponse("success", {
                property_id: id,
                ...mergedData,
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
        const record = await PropertyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        // Delete type
        const deleteType = req.header("X-Delete-Type") ?? "soft";

        if (deleteType === "soft") {
            await PropertyModel.softDelete(id);
        } else {
            await PropertyModel.hardDelete(id);
        }

        await PropertyModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const getProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;

        const property = await PropertyModel.get(propertyId);
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};

export const addCoverImage = async() => {
    try {
        const { id } = req.params;
        const {
            reference,
            district_id,
            county_id,
            parish_id,
            property_goal_id,
            property_status_id,
            property_type_id,
        } = req.validatedData;

        // Find record
        const record = await PropertyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

    } catch (error) {

    }
};