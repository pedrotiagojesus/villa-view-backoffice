import CountyModel from "../models/countyModel.js";

export const listCounty = async (req, res) => {
    try {
        const county = await CountyModel.getAll();
        res.status(200).json(county);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCounty = async (req, res) => {
    try {
        const newCounty = await CountyModel.create(req.body);
        res.status(201).json(newCounty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
