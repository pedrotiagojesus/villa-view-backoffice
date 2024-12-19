import { db } from "../config/database/mysql.js";

export default {
    getAll: async () => {
        const [result] = await db.query("SELECT * FROM `property_status` WHERE `deleted_at` IS NULL");
        return result;
    },
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `property_status` WHERE `property_status_id` = ? AND `deleted_at` IS NULL",
            [id]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    create: async ({ name }) => {
        const [result] = await db.query(
            "INSERT INTO `property_status` (name) VALUES (?)",
            [name]
        );
        return result;
    },
    update: async (id, { name }) => {
        const [result] = await db.query(
            "UPDATE `property_status` SET `name` = ? WHERE `property_status_id` = ?",
            [name, id]
        );
        return result;
    },
    softDelete: async (id) => {
        const [result] = await db.query(
            "UPDATE `property_status` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `property_status_id` = ?",
            [id]
        );
        return result;
    },
    /**
     * Deletes a record from the property_status table.
     * @param {number} id the id of the record to delete
     * @returns {Promise<Object>} the result of the query
     */
    hardDelete: async (id) => {
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
