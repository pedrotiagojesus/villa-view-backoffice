import { db } from "../config/database/mysql.js";

const table = "property";

export default {
    /*
    get: async (propertyId) => {
        const docRef = db.collection(table).doc(propertyId);

        try {
            const docSnap = await docRef.get();
            if (!docSnap.exists) {
                return null;
            }

            const data = {
                id: docSnap.id,
                ...docSnap.data(),
                cover_image_url: await getUrl(docSnap.data().cover_image),
                other_image_url: await getMultipleUrl(
                    docSnap.data().other_image
                ),
            };

            return data;
        } catch (error) {
            console.error("Erro ao buscar o documento:", error.message);
            throw error;
        }
    },
    getNew: async () => {
        const snapshot = await db
            .collection(table)
            .where("is_visible", "==", true)
            .orderBy("createdAt", "desc")
            .get();
        const data = await Promise.all(
            snapshot.docs.map(async (doc) => ({
                id: doc.id,
                ...doc.data(),
                cover_image_url: await getUrl(doc.data().cover_image),
            }))
        );

        return data;
    },
    */
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
        let query = "SELECT * FROM property WHERE is_visible = ?";
        let data = [true];

        if (typeof is_highlight == "boolean") {
            query += " AND is_highlight = ?"
            data.push(is_highlight);
        }

        if (price_min && price_max) {
            query += " AND price BETWEEN ? AND ?"
            data.push(price_min, price_max);
        }

        if (district_id) {
            query += " AND district_id = ?"
            data.push(district_id);
        }

        if (county_id) {
            query += " AND county_id = ?"
            data.push(county_id);
        }

        if (parish_id) {
            query += " AND parish_id = ?"
            data.push(parish_id);
        }

        if (property_type_id) {
            query += " AND property_type_id = ?"
            data.push(property_type_id);
        }

        if (property_goal_id) {
            query += " AND property_goal_id = ?"
            data.push(property_goal_id);
        }

        if (property_status_id) {
            query += " AND property_status_id = ?"
            data.push(property_status_id);
        }

        if (room) {
            query += " AND room = ?"
            data.push(room);
        }

        query += " ORDER BY `creation_date` DESC";

        const [result] = await db.query(query, data);
        return result;
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
};
