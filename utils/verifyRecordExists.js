import ApiError from "./ApiError.js";

const verifyRecordExists = async (model, id, type) => {
    const record = await model.get(id);
    if (!record) {
        throw new ApiError(
            404,
            `O ${type}_id fornecido não existe.`,
            "RECORD_NOT_FOUND"
        );
    }
    return record;
};

export { verifyRecordExists };
