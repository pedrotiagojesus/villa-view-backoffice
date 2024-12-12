import { db } from "../config/database/mysql.js";

export default {
    getAll: async (districtId) => {
        const [result] = await db.query("SELECT * FROM `county` WHERE `district_id` = ?", [districtId]);
        return result;
    },
    create: async (districtId, name) => {
        const [result] = await db.query(
            "INSERT INTO `county` (`district_id`, `name`) VALUES (?, ?)",
            [districtId, name]
        );
        return result;
    },
    truncate: async (data) => {
        const [result] = await db.query("TRUNCATE TABLE `county`");
        return result;
    },
};
