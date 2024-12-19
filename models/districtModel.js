import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [rows] = await db.query(
            "SELECT * FROM `district` WHERER `deleted_at` IS NULL"
        );
        return rows;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `district` WHERE `district_id` = ? AND `deleted_at` IS NULL",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async ({ name }) => {
        const [result] = await db.query(
            "INSERT INTO `district` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    update: async (id, { name }) => {
        const [result] = await db.query(
            "UPDATE `district` SET `name` = ? WHERE `district_id` = ?",
            [name, id]
        );
        return result;
    },
    softDelete: async (id) => {
        const [result] = await db.query(
            "UPDATE `district` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `district_id` = ?",
            [id]
        );
        return result;
    },
    hardDelete: async (id) => {
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
