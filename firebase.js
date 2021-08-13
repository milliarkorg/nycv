import firebase from 'firebase';
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCoeywy-lFmiWjxr_EXQIl4C9nnTihZQ7A",
  authDomain: "new-york-city-village.firebaseapp.com",
  databaseURL: "https://new-york-city-village.firebaseio.com",
  projectId: "new-york-city-village",
  storageBucket: "new-york-city-village.appspot.com",
  messagingSenderId: "359184157731",
  appId: "1:359184157731:web:29d0f22c8ad4f4ec133596"
};

firebase.initializeApp(firebaseConfig)

export default firebase