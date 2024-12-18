// Models
import DbModel from "../models/dbModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

export const connectionDb = async (req, res) => {
    try {
        await DbModel.connection();
        res.status(200).json(
            createApiResponse("success", "Conectado ao MySQL!")
        );
    } catch (error) {
        next(error);
    }
};
