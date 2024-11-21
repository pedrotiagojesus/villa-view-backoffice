import { bucket } from "../config/firebase.js";

export const getUrl = async (filePath) => {
    if (filePath === null) {
        return "";
    }

    try {
        const file = bucket.file(filePath);

        const [url] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2025",
        });

        return url;
    } catch (error) {
        console.error("Erro ao obter URL do Firebase Storage:", error.message);
        throw error;
    }
};

export const getMultipleUrl = async (filePathArr) => {
    const urlArr = [];

    if (!Array.isArray(filePathArr)) {
        return urlArr;
    }

    if (filePathArr.length === 0) {
        return urlArr;
    }

    await Promise.all(
        filePathArr.map(async (filePath) => {
            urlArr.push(await getUrl(filePath));
        })
    );

    urlArr.sort((a, b) => a.localeCompare(b));

    return urlArr;
};
