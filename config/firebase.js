// src/config/firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "villa-view-40e63.appspot.com",
        databaseURL: "https://villa-view-40e63.firebaseio.com",
    });
}

const db = admin.firestore();

const bucket = admin.storage().bucket();

export { db, bucket };
