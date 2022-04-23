// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAyZELV6w_AvnYfVmIkMy57vhymbevw85M',
  authDomain: 'gbairai.firebaseapp.com',
  projectId: 'gbairai',
  storageBucket: 'gbairai.appspot.com',
  messagingSenderId: '328294872897',
  appId: '1:328294872897:web:35b1ec66de9c6ec0d293c0',
  measurementId: 'G-2WTFSRGBW6',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()

const storage = getStorage()

export { app, db, storage }
