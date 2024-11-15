import PropertyStatusModel from "../models/propertyStatusModel.js";

export const listPropertyStatus = async (req, res) => {
    try {
        const propertyStatus = await PropertyStatusModel.getAll();
        res.status(200).json(propertyStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPropertyStatus = async (req, res) => {
    try {
        const newPropertyStatus = await PropertyStatusModel.create(req.body);
        res.status(201).json(newPropertyStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
