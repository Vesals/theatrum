// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection as baseCollection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgko_1pBiIMPjArrAS1MsVusn78adBguc",
  authDomain: "movie-app-8036d.firebaseapp.com",
  projectId: "movie-app-8036d",
  storageBucket: "movie-app-8036d.appspot.com",
  messagingSenderId: "141778825823",
  appId: "1:141778825823:web:7472c4b4ac6c31df67a1ea",
  measurementId: "G-31SEPT0MYN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

// const collection = (path: string) => baseCollection(db, path);

// export { collection };