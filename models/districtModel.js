import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [result] = await db.query("SELECT * FROM `district`");
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `district` WHERE `district_id` = ?",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async (name) => {
        const [result] = await db.query(
            "INSERT INTO `district` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    update: async (id, name) => {
        const [result] = await db.query(
            "UPDATE `district` SET `name` = ? WHERE `district_id` = ?",
            [name, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM `district` WHERE `district_id` = ?",
            [id]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `district`");
        return result;
    },
};
