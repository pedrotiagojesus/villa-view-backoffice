import data from "../data/distric.json";

import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const District = () => {
    data.map(async (district) => {
        const document = { ...district, createdAt: Timestamp.now() };

        const insertedDocument = await addDoc(
            collection(db, "district"),
            document
        );

        // console.log(insertedDocument);
        // console.log(document);
    });
};

export default District;
