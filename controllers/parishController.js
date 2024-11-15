import ParishModel from "../models/parishModel.js";

export const listParish = async (req, res) => {
    try {
        const parish = await ParishModel.getAll();
        res.status(200).json(parish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createParish = async (req, res) => {
    try {
        const newParish = await ParishModel.create(req.body);
        res.status(201).json(newParish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
