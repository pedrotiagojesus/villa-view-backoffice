import { db } from "../config/database/mysql.js";

export default {
    getAll: async (districtId) => {
        const [result] = await db.query(
            "SELECT * FROM `county` WHERE `district_id` = ?",
            [districtId]
        );
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `county` WHERE `county_id` = ?",
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
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `county`");
        return result;
    },
};
