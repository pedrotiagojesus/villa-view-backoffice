// Utils
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return async (req, res, next) => {

        console.log("fields:", req.body);
        console.log("files:", req.files);
        return;

        try {
            // Valida os dados do body com o esquema fornecido
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

            // Salva os dados validados para uso futuro
            req.validatedData = value;
            next();
        } catch (validationError) {
            next(validationError); // Passa o erro para o middleware de erro
        }
    };
};

export default validate;
