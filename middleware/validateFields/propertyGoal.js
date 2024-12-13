import { createApiResponse } from "../../utils/response.js";

export const validateCreateFields = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'name' é obrigatório",
            })
        );
    }
    next();
};