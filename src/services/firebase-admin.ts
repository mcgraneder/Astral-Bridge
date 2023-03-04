import * as admin from "firebase-admin";
import Collections from "./Collections";

class FirebaseClass {
  async init() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_APP_ID,
          clientEmail: process.env.FIREBASE_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
    }

    const db = admin.firestore();
    const { FieldValue } = admin.firestore;
    const userRef = db.collection(Collections.users);

    return { db, FieldValue, userRef };
  }
}

const Firebase = async () => {
  const firebase = new FirebaseClass();
  return firebase.init();
};

export default Firebase;
