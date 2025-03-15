import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔹 Initialize Firebase App First
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 

// Exporting Firebase Storage Utils
export { ref, uploadBytes, getDownloadURL };

// 🛠 Function to check if user is approved
export const loginUser = async (email: string, password: string) => {
  try {
    console.log(`Attempting login for: ${email}`);

    // `signInWithEmailAndPassword` returns `UserCredential`
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Extract `user` from `UserCredential`
    
    console.log("Firebase Auth Success:", user);

    // 🔹 Fetch user approval status from Firestore
    const userRef = doc(db, "approvedUsers", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("Access Denied: Not in approvedUsers.");
      throw new Error("Access Denied: You are not authorized to log in.");
    }

    console.log("User is approved:", userSnap.data());
    return user; 
  } catch (error) {
    //  Type assertion for error handling
    const errMessage = (error as Error).message || "An unknown error occurred.";
    console.error("Login Error:", errMessage);
    throw new Error(errMessage);
  }
};

export default app;
