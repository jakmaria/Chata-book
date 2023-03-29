import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CHATABOOK_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CHATABOOK_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CHATABOOK_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CHATABOOK_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CHATABOOK_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CHATABOOK_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_CHATABOOK_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
