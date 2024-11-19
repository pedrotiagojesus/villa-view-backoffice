import ParishModel from "../models/parishModel.js";

export const listParish = async (req, res) => {
    const countyId = req.query.countyId;

    if (!countyId) {
        return res
            .status(400)
            .json({ error: "O parâmetro countyId é obrigatório." });
    }

    try {
        const data = await ParishModel.getAll(countyId);

        if (!data.length) {
            return res.status(404).json({
                message: "Nenhuma freguesia encontrada para este concelho.",
            });
        }

        res.status(200).json(data);
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
