import db from "../config/firebase.js";

const table = "county";

export default {
    getAll: async (districtId) => {
        const snapshot = await db
            .collection(table)
            .where("district_id", "==", Number(districtId))
            .orderBy("name", "asc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (data) => {
        const ref = await db.collection(table).add(data);
        return { id: ref.id, ...data };
    },
};
