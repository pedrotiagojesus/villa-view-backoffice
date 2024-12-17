import { db } from "../config/database/mysql.js";

export default {
    getAll: async (countyId) => {
        const [result] = await db.query(
            "SELECT * FROM `parish` WHERE `county_id` = ?",
            [countyId]
        );
        return result;
    },
    create: async ({ district_id, county_id, name }) => {
        const [result] = await db.query(
            "INSERT INTO `parish` (`district_id`, `county_id`, `name`) VALUES (?, ?, ?)",
            [district_id, county_id, name]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `parish`");
        return result;
    },
};
