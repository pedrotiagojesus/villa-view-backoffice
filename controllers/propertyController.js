// Models
import PropertyModel from "../models/propertyModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

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
        const newRecord = await PropertyModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_id: newRecord.insertId,
                ...req.validatedData,
            })
        );
    } catch (error) {
        console.log(error);
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
