import { createApiResponse } from "../utils/response.js";

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json(
                createApiResponse("error", null, {
                    code: "DNF",
                    message: "Validation error",
                    details: error.details
                })
            );

        }

        req.validatedData = value;
        next();
    };
};

export default validate;