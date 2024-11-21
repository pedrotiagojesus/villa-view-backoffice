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

export const createProperty = async (req, res) => {
    try {
        const newProperty = await PropertyModel.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
