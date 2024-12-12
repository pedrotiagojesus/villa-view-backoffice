const createApiResponse = (status, data = null, error = null) => {
    return {
        status,
        data,
        error,
        timestamp: new Date().toISOString(),
    };
};

export { createApiResponse };
