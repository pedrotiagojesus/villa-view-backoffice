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
