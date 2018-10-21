import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyBxKthg4LSVlQXzG-8IdQF-SaykhGFxWNI",
  authDomain: "virtualsenpai-71ac3.firebaseapp.com",
  databaseURL: "https://virtualsenpai-71ac3.firebaseio.com",
  projectId: "virtualsenpai-71ac3",
  storageBucket: "virtualsenpai-71ac3.appspot.com",
  messagingSenderId: "906077178422"
};

let app = Firebase.initializeApp(config);
// let db = app.database();
// let testref = db.ref("test");

export const db = app.database(); // export for other components to use
