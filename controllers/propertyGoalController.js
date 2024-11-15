import PropertyGoalModel from "../models/propertyGoalModel.js";

export const listPropertyGoal = async (req, res) => {
    try {
        const propertyGoal = await PropertyGoalModel.getAll();
        res.status(200).json(propertyGoal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPropertyGoal = async (req, res) => {
    try {
        const newPropertyGoal = await PropertyGoalModel.create(req.body);
        res.status(201).json(newPropertyGoal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
