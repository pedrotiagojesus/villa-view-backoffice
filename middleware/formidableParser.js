import formidable, { errors as formidableErrors } from "formidable";

const parseForm = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir: "./uploads",
            keepExtensions: true,
            allowEmptyFiles: false,
            maxFileSize: 50 * 1024 * 1024,
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            resolve({ fields, files });
        });
    });
};

const formidableParser = async (req, res, next) => {
    let fields, files;

    try {
        // Parseia o formulário
        const result = await parseForm(req);
        files = result.files;

        // Normaliza os campos
        fields = {};
        for (const [key, value] of Object.entries(result.fields)) {
            fields[key] =
                Array.isArray(value) && value.length === 1
                    ? value[0]
                    : value;
        }

        // Adiciona os campos e arquivos ao corpo da requisição
        req.body = fields;
        req.files = files;

        // Continua para o próximo middleware ou lógica do controlador
        next();
    } catch (err) {
        console.error("Erro ao processar o formulário:", err);
        return next(
            new ApiError(
                err.httpCode || 400,
                "Erro ao processar o formulário",
                "FORM_ERROR"
            )
        );
    }
};

export default formidableParser;