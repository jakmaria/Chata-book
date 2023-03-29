
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.CHATABOOK_API_KEY,
  authDomain: process.env.CHATABOOK_AUTH_DOMAIN,
  projectId:process.env.CHATABOOK_PROJECT_ID,
  storageBucket: process.env.CHATABOOK_STORAGE_BUCKET,
  messagingSenderId: process.env.CHATABOOK_MESSAGING_SENDER_ID,
  appId: process.env.CHATABOOK_APP_ID,
  measurementId: process.env.CHATABOOK_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);