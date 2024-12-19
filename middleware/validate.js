// Utils
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            throw new ApiError(
                400,
                error.details.map((d) => d.message).join(", "),
                "MISSING_FIELDS"
            );
        }

        req.validatedData = value;
        next();
    };
};

export default validate;
