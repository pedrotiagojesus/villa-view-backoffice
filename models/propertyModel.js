import db from "../config/firebase.js";

export default {
    getAll: async () => {
        const snapshot = await db
            .collection("property")
            .where("is_visible", "==", true)
            .orderBy("createdAt", "desc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    getHighlight: async () => {
        const snapshot = await db
            .collection("property")
            .where("is_visible", "==", true)
            .where("is_highlight", "==", true)
            .orderBy("createdAt", "desc")
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (data) => {
        const ref = await db.collection("property").add(data);
        return { id: ref.id, ...data };
    },
};
