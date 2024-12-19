import { db } from "../config/database/mysql.js";

export default {
    getAll: async (districtId) => {
        let query = "SELECT * FROM `county` WHERE `deleted_at` IS NULL";
        let data = [];

        if (districtId) {
            query += " AND `district_id` = ?";
            data.push(districtId);
        }

        const [result] = await db.query(query, data);
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `county` WHERE `county_id` = ? AND `deleted_at` IS NULL",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async ({ district_id, name }) => {
        const [result] = await db.query(
            "INSERT INTO `county` (`district_id`, `name`) VALUES (?, ?)",
            [district_id, name]
        );
        return result;
    },
    update: async (id, { district_id, name }) => {
        const [result] = await db.query(
            "UPDATE `county` SET `district_id` = ?, `name` = ? WHERE `county_id` = ?",
            [district_id, name, id]
        );
        return result;
    },
    softDelete: async (id) => {
        const [result] = await db.query(
            "UPDATE `county` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `county_id` = ?",
            [id]
        );
        return result;
    },
    hardDelete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM `county` WHERE `county_id` = ?",
            [id]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `county`");
        return result;
    },
};
