import { createApiResponse } from "../../utils/response.js";

export const validateCreateFields = (req, res, next) => {
    const {
        reference,
        district_id,
        county_id,
        parish_id,
        property_goal_id,
        property_status_id,
        property_type_id,
        property_name,
    } = req.body;

    if (!reference) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'reference' é obrigatório",
            })
        );
    }

    if (reference.length != 8) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'reference' tem de ter 8 caracteres",
            })
        );
    }

    if (!district_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'district_id' é obrigatório",
            })
        );
    }

    if (!county_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'county_id' é obrigatório",
            })
        );
    }

    if (!parish_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'parish_id' é obrigatório",
            })
        );
    }

    if (!property_goal_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'property_goal_id' é obrigatório",
            })
        );
    }

    if (!property_status_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'property_status_id' é obrigatório",
            })
        );
    }

    if (!property_type_id) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'property_type_id' é obrigatório",
            })
        );
    }

    if (!property_name) {
        return res.status(400).json(
            createApiResponse("error", null, {
                code: "MISS_PARAM",
                message: "O campo 'property_name' é obrigatório",
            })
        );
    }

    next();
};
