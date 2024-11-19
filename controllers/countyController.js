import CountyModel from "../models/countyModel.js";

export const listCounty = async (req, res) => {
    const districtId = req.query.districtId;

    if (!districtId) {
        return res
            .status(400)
            .json({ error: "O parâmetro districtId é obrigatório." });
    }

    try {
        const data = await CountyModel.getAll(districtId);

        if (!data.length) {
            return res.status(404).json({
                message: "Nenhum concelho encontrado para este distrito.",
            });
        }

        res.status(200).json(data);
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
