import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [result] = await db.query("SELECT * FROM `district`");
        return result;
    },
    create: async (name) => {
        const [result] = await db.query(
            "INSERT INTO `district` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `district`");
        return result;
    },
};
