import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [result] = await db.query("SELECT * FROM `property_type`");
        return result;
    },
    create: async (name) => {
        const [result] = await db.query(
            "INSERT INTO `property_type` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `property_type`");
        return result;
    },
};
