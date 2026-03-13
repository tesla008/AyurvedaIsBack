import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4moJeDUkgzr8-dnm1bnl7-mYWbAklZNA",
  authDomain: "studio-525996013-b737d.firebaseapp.com",
  projectId: "studio-525996013-b737d",
  storageBucket: "studio-525996013-b737d.appspot.com",
  messagingSenderId: "795799824940",
  appId: "1:795799824940:web:984177428094f9c756ff89"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
