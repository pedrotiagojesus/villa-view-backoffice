import DistrictModel from "../models/districtModel.js";

export const listDistrict = async (req, res) => {
    try {
        const district = await DistrictModel.getAll();
        res.status(200).json(district);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDistrict = async (req, res) => {
    try {
        const newDistrict = await DistrictModel.create(req.body);
        res.status(201).json(newDistrict);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
