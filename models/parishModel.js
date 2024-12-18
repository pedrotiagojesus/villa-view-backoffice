import { db } from "../config/database/mysql.js";

export default {
    getAll: async (countyId) => {
        let query = "SELECT * FROM `parish` WHERE 1";
        let data = [];

        if (countyId) {
            query += " AND `county_id` = ?";
            data.push(countyId);
        }

        const [result] = await db.query(query, data);
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `parish` WHERE `parish_id` = ?",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async ({ district_id, county_id, name }) => {
        const [result] = await db.query(
            "INSERT INTO `parish` (`district_id`, `county_id`, `name`) VALUES (?, ?, ?)",
            [district_id, county_id, name]
        );
        return result;
    },
    update: async (id, { district_id, county_id, name }) => {
        const [result] = await db.query(
            "UPDATE `parish` SET `district_id` = ?, `county_id` = ?, `name` = ? WHERE `parish_id` = ?",
            [district_id, county_id, name, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM `parish` WHERE `parish_id` = ?",
            [id]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `parish`");
        return result;
    },
};
