// ============================================================
// GiveNet — Firebase Configuration
// ============================================================
// TODO: Replace placeholder values with actual Firebase project
// credentials from the Firebase Console (Project Settings >
// Your apps > Web app config).
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyARJmYbPT3ziEYEHNc98ENBGiOoxfUzAlc",
  authDomain:        "givenet-cb207.firebaseapp.com",
  projectId:         "givenet-cb207",
  storageBucket:     "givenet-cb207.firebasestorage.app",
  messagingSenderId: "454729963239",
  appId:             "1:454729963239:web:dbe437da91a17f7093f442"
};

const app = initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
