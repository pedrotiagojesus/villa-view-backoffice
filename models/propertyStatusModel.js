import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [result] = await db.query("SELECT * FROM `property_status`");
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `property_status` WHERE `property_status_id` = ?",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async (name) => {
        const [result] = await db.query(
            "INSERT INTO `property_status` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    update: async (id, name) => {
        const [result] = await db.query(
            "UPDATE `property_status` SET `name` = ? WHERE `property_status_id` = ?",
            [name, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM `property_status` WHERE `property_status_id` = ?",
            [id]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `property_status`");
        return result;
    },
};
