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

export const getProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        const property = await PropertyModel.get(propertyId);
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listPropertyHighlight = async (req, res) => {
    try {
        const property = await PropertyModel.getHighlight();
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listPropertyNew = async (req, res) => {
    try {
        const property = await PropertyModel.getNew();
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listPropertySearch = async (req, res) => {
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    const districtId = req.query.districtId;
    const countyId = req.query.countyId;
    const parishId = req.query.parishId;
    const propertyTypeId = req.query.propertyTypeId;
    const propertyGoalId = req.query.propertyGoalId;
    const propertyStatusId = req.query.propertyStatusId;
    const room = req.query.room;

    try {
        const property = await PropertyModel.getSearch(
            priceMin,
            priceMax,
            districtId,
            countyId,
            parishId,
            propertyTypeId,
            propertyGoalId,
            propertyStatusId,
            room
        );
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
