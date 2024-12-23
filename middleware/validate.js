// Utils
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        // Acessa os campos enviados
        console.log('Campos do formulário:', req.body);

        // Acessa o arquivo enviado
        console.log('Informações do arquivo:', req.file);

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
