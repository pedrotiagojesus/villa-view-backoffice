import PropertyModel from "../models/propertyModel.js";

export const listProperty = async (req, res) => {
    try {
        const property = await PropertyModel.getAll();
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

export const createProperty = async (req, res) => {
    try {
        const newProperty = await PropertyModel.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
