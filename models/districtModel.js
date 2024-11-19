import db from "../config/firebase.js";

const table = "district";

export default {
    getAll: async () => {
        const snapshot = await db
            .collection(table)
            .orderBy("name", "asc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (data) => {
        const ref = await db.collection(table).add(data);
        return { id: ref.id, ...data };
    },
};
