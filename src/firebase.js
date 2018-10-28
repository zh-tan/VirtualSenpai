import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyD9sybcUqJyppHJww0AiKrWCBpU_7Dytng",
  authDomain: "virtualsenpaiv2.firebaseapp.com",
  databaseURL: "https://virtualsenpaiv2.firebaseio.com",
  projectId: "virtualsenpaiv2",
  storageBucket: "virtualsenpaiv2.appspot.com",
  messagingSenderId: "696334416212"
};

let app = Firebase.initializeApp(config);
// let db = app.database();
// let testref = db.ref("test");

export const db = app.database(); // export for other components to use
