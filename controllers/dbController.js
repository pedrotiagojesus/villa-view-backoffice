import DbModel from "../models/dbModel.js";
import { createApiResponse } from "../utils/response.js";

export const connectionDb = async (req, res) => {
    try {
        await DbModel.connection();
        res.status(200).json(
            createApiResponse("success", "Conectado ao MySQL!")
        );
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};
