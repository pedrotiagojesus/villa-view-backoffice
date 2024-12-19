import { db } from "../config/database/mysql.js";

export default {
    getAll: async (countyId) => {
        let query = "SELECT * FROM `parish` WHERE `deleted_at` IS NULL";
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
            "SELECT * FROM `parish` WHERE `parish_id` = ? AND `deleted_at` IS NULL",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    countByCounty: async (county_id) => {
        let query = `SELECT COUNT(*) AS count FROM parish WHERE county_id = ?`;
        let data = [county_id];
        const [result] = await db.query(query, data);
        return result[0].count;
    },
    countByDistrict: async (district_id) => {
        let query = `SELECT COUNT(*) AS count FROM parish WHERE district_id = ?`;
        let data = [district_id];
        const [result] = await db.query(query, data);
        return result[0].count;
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
    softDelete: async (id) => {
        const [result] = await db.query(
            "UPDATE `parish` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `parish_id` = ?",
            [id]
        );
        return result;
    },
    hardDelete: async (id) => {
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
