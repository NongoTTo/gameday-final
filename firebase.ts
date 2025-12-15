import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 1. เพิ่มบรรทัดนี้

const firebaseConfig = {
  apiKey: "AIzaSyBgbmBiyl6___Q5N75tVt-eSSUTelqYRgI",
  authDomain: "webapplication01-39e81.firebaseapp.com",
  projectId: "webapplication01-39e81",
  storageBucket: "webapplication01-39e81.firebasestorage.app",
  messagingSenderId: "543185181831",
  appId: "1:543185181831:web:6d35ff0c1680f7c67a6c22",
  measurementId: "G-DYZKBCJZ5G"
};

// เริ่มต้นแอป
export const app = initializeApp(firebaseConfig);

// 2. เริ่มต้นฐานข้อมูล และส่งออกตัวแปร db ให้ไฟล์อื่นเอาไปใช้
export const db = getFirestore(app); 

console.log("Firebase initialized:", app.name);
// update config firebase
console.log("Force Update API Key");
// update v2
// final fix
// update final
console.log("Final Version 1.0");