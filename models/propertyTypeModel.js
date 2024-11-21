import { db } from "../config/firebase.js";

export default {
    getAll: async () => {
        const snapshot = await db
            .collection("property_type")
            .orderBy("name", "asc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (data) => {
        const ref = await db.collection("property_type").add(data);
        return { id: ref.id, ...data };
    },
};
