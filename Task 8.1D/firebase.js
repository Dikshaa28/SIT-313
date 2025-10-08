// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV8iiesmC-tWXZZuKIlAHz4SyX7SBO2UU",
  authDomain: "week8-ee825.firebaseapp.com",
  projectId: "week8-ee825",
  storageBucket: "week8-ee825.firebasestorage.app",
  messagingSenderId: "1010367614548",
  appId: "1:1010367614548:web:4e132e7ad47ad44ab267c1",
  measurementId: "G-R7K2TSMFMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore + Auth + Storage setup
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ Added storage export

// Google provider setup
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Corrected export (camelCase)
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Create or fetch user document in Firestore
export const createUserDoc = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userDocRef;
};

// Export app if needed
export default app;