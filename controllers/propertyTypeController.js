import PropertyTypeModel from "../models/propertyTypeModel.js";

export const listPropertyType = async (req, res) => {
    try {
        const propertyType = await PropertyTypeModel.getAll();
        res.status(200).json(propertyType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPropertyType = async (req, res) => {
    try {
        const newPropertyType = await PropertyTypeModel.create(req.body);
        res.status(201).json(newPropertyType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
