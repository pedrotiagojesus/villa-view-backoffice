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

export const getRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        res.status(200).json(createApiResponse("success", record));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const listRecords = async (req, res) => {
    try {
        const properties = await PropertyModel.getAll();
        res.status(200).json(createApiResponse("success", properties));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const listRecordsHighlight = async (req, res) => {
    try {
        const properties = await PropertyModel.getAll(true);
        res.status(200).json(createApiResponse("success", properties));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const listRecordsSearch = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

export const createRecord = async (req, res) => {
    try {
        const {
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
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message:
                        "O county_id fornecido não pretence ao district_id indicado.",
                })
            );
        }

        if (county_id != parish.county_id) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message:
                        "O parish_id fornecido não pretence ao county_id indicado.",
                })
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
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(
                createApiResponse("error", null, {
                    code: error.code,
                    message: error.message,
                })
            );
        }

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
        const {
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
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
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
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message:
                        "O county_id fornecido não pretence ao district_id indicado.",
                })
            );
        }

        if (county_id != parish.county_id) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message:
                        "O parish_id fornecido não pretence ao county_id indicado.",
                })
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
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(
                createApiResponse("error", null, {
                    code: error.code,
                    message: error.message,
                })
            );
        }

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
        const record = await PropertyModel.get(id);

        if (!record) {
            return res.status(404).json(
                createApiResponse("error", null, {
                    code: "RECORD_NOT_FOUND",
                    message: "Registo não encontrado.",
                })
            );
        }

        await PropertyModel.delete(id);
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

export const getProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const property = await PropertyModel.get(propertyId);
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
