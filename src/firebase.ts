import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHPQ5g2CBHF7jfSeNQ2OtqDyyn5N5K3sE",
  authDomain: "cafebridgeapp.firebaseapp.com",
  projectId: "cafebridgeapp",
  storageBucket: "cafebridgeapp.firebasestorage.app",
  messagingSenderId: "4627006583",
  appId: "1:4627006583:web:9a6a85500eaa69d4acf272",
  measurementId: "G-214SDRZ2T1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
