import db from "../config/firebase.js";

const table = "parish";

export default {
    getAll: async (countyId) => {
        const snapshot = await db
            .collection(table)
            .where("county_id", "==", Number(countyId))
            .orderBy("name", "asc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (data) => {
        const ref = await db.collection(table).add(data);
        return { id: ref.id, ...data };
    },
};
