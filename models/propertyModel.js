import { db } from "../config/database/mysql.js";

const propertyModel = {
    get: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM `property` WHERE `property_id` = ? AND is_visible = ? `deleted_at` IS NULL",
            [id, true]
        );
        const row = rows.length > 0 ? rows[0] : null;
        return row;
    },
    getAll: async (
        is_highlight,
        price_min,
        price_max,
        district_id,
        county_id,
        parish_id,
        property_type_id,
        property_goal_id,
        property_status_id,
        room
    ) => {
        let query =
            "SELECT * FROM property WHERE is_visible = ? `deleted_at` IS NULL";
        let data = [true];

        if (typeof is_highlight == "boolean") {
            query += " AND is_highlight = ?";
            data.push(is_highlight);
        }

        if (price_min && price_max) {
            query += " AND price BETWEEN ? AND ?";
            data.push(price_min, price_max);
        }

        if (district_id) {
            query += " AND district_id = ?";
            data.push(district_id);
        }

        if (county_id) {
            query += " AND county_id = ?";
            data.push(county_id);
        }

        if (parish_id) {
            query += " AND parish_id = ?";
            data.push(parish_id);
        }

        if (property_type_id) {
            query += " AND property_type_id = ?";
            data.push(property_type_id);
        }

        if (property_goal_id) {
            query += " AND property_goal_id = ?";
            data.push(property_goal_id);
        }

        if (property_status_id) {
            query += " AND property_status_id = ?";
            data.push(property_status_id);
        }

        if (room) {
            query += " AND room = ?";
            data.push(room);
        }

        query += " ORDER BY `creation_date` DESC";

        const [result] = await db.query(query, data);
        return result;
    },
    countByPropertyType: async (property_type_id) => {
        return propertyModel.countBy("property_type_id", property_type_id);
    },
    countByPropertyStatus: async (property_status_id) => {
        return propertyModel.countBy("property_status_id", property_status_id);
    },
    countByPropertyGoal: async (property_goal_id) => {
        return propertyModel.countBy("property_goal_id", property_goal_id);
    },
    countByParish: async (parish_id) => {
        return propertyModel.countBy("parish_id", parish_id);
    },
    countByCounty: async (county_id) => {
        return propertyModel.countBy("county_id", county_id);
    },
    countByDistrict: async (district_id) => {
        return propertyModel.countBy("district_id", district_id);
    },
    countBy: async (field, value) => {
        let query = `SELECT COUNT(*) AS count FROM property WHERE ${field} = ?`;
        let data = [value];
        const [result] = await db.query(query, data);
        return result[0].count;
    },
    create: async ({
        reference,
        district_id,
        county_id,
        parish_id,
        property_goal_id,
        property_status_id,
        property_type_id,
        property_name,
        description,
        construction_year,
        contact,
        cover_image,
        email,
        latitude,
        longitude,
        name,
        price,
        room,
        is_visible,
        is_highlight,
    }) => {
        const [result] = await db.query(
            `INSERT INTO property (
                reference,
                district_id,
                county_id,
                parish_id,
                property_goal_id,
                property_status_id,
                property_type_id,
                property_name,
                description,
                construction_year,
                contact,
                cover_image,
                email,
                latitude,
                longitude,
                name,
                price,
                room,
                is_visible,
                is_highlight
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )`,
            [
                reference,
                district_id,
                county_id,
                parish_id,
                property_goal_id,
                property_status_id,
                property_type_id,
                property_name,
                description,
                construction_year,
                contact,
                cover_image,
                email,
                latitude,
                longitude,
                name,
                price,
                room,
                is_visible,
                is_highlight,
            ]
        );
        return result;
    },
    update: async (
        id,
        {
            reference,
            district_id,
            county_id,
            parish_id,
            property_goal_id,
            property_status_id,
            property_type_id,
            property_name,
            description,
            construction_year,
            contact,
            cover_image,
            email,
            latitude,
            longitude,
            name,
            price,
            room,
            is_visible,
            is_highlight,
        }
    ) => {
        const [result] = await db.query(
            `UPDATE property SET
                reference = ?,
                district_id = ?,
                county_id = ?,
                parish_id = ?,
                property_goal_id = ?,
                property_status_id = ?,
                property_type_id = ?,
                property_name = ?,
                description = ?,
                construction_year = ?,
                contact = ?,
                cover_image = ?,
                email = ?,
                latitude = ?,
                longitude = ?,
                name = ?,
                price = ?,
                room = ?,
                is_visible = ?,
                is_highlight = ?
            WHERE property_id = ?`,
            [
                reference,
                district_id,
                county_id,
                parish_id,
                property_goal_id,
                property_status_id,
                property_type_id,
                property_name,
                description,
                construction_year,
                contact,
                cover_image,
                email,
                latitude,
                longitude,
                name,
                price,
                room,
                is_visible,
                is_highlight,
                id,
            ]
        );
        return result;
    },
    softDelete: async (id) => {
        const [result] = await db.query(
            "UPDATE `property` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `property_id` = ?",
            [id]
        );
        return result;
    },
    hardDelete: async (id) => {
        const [result] = await db.query(
            "DELETE FROM `property` WHERE `property_id` = ?",
            [id]
        );
        return result;
    },
};

export default propertyModel;
