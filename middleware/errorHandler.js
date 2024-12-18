// Utils
import ApiError from "../utils/ApiError.js";
import { createApiResponse } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(
            createApiResponse("error", null, {
                code: err.code || "UNEXPECTED_ERROR",
                message: err.message || "Ocorreu um erro inesperado.",
            })
        );
    }
    console.log(err);
    res.status(500).json(
        createApiResponse("error", null, {
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
        })
    );
};

export default errorHandler;
