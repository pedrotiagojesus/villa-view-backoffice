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
    getHighlight: async () => {
        const snapshot = await db
            .collection(table)
            .where("is_visible", "==", true)
            .where("is_highlight", "==", true)
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
    getSearch: async (
        priceMin,
        priceMax,
        districtId,
        countyId,
        parishId,
        propertyTypeId,
        propertyGoalId,
        propertyStatusId,
        room
    ) => {
        let query = db.collection(table).where("is_visible", "==", true);

        if (priceMin != null) {
            query = query.where("price", ">=", Number(priceMin));
        }

        if (priceMax != null) {
            query = query.where("price", "<=", Number(priceMax));
        }

        if (districtId != null) {
            query = query.where("district_id", "==", Number(districtId));
        }

        if (countyId != null) {
            query = query.where("county_id", "==", Number(countyId));
        }

        if (parishId != null) {
            query = query.where("parish_id", "==", Number(parishId));
        }

        if (propertyTypeId != null) {
            query = query.where(
                "property_type_id",
                "==",
                Number(propertyTypeId)
            );
        }

        if (propertyGoalId != null) {
            query = query.where(
                "property_goal_id",
                "==",
                Number(propertyGoalId)
            );
        }

        if (propertyStatusId != null) {
            query = query.where(
                "property_status_id",
                "==",
                Number(propertyStatusId)
            );
        }

        if (room != null) {
            query = query.where("room", "==", Number(room));
        }

        query = query.orderBy("createdAt", "desc");

        const snapshot = await query.get();

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
    getAll: async () => {
        const [result] = await db.query(
            "SELECT * FROM `property` WHERE `is_visible` = ?",
            [true]
        );
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
