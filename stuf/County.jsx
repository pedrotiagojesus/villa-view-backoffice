import data from "../data/county.json";

import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const County = () => {
    data.map(async (county) => {
        const document = { ...county, createdAt: Timestamp.now() };

        const insertedDocument = await addDoc(
            collection(db, "county"),
            document
        );

        // console.log(insertedDocument);
        // console.log(document);
    });
};

export default County;
