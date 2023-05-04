import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPMSDU3tgjKBwQN0nw7IGm-f1_GVOrBE0",
    authDomain: "coursera-chat-react-app.firebaseapp.com",
    projectId: "coursera-chat-react-app",
    storageBucket: "coursera-chat-react-app.appspot.com",
    messagingSenderId: "956606406770",
    appId: "1:956606406770:web:205a9445666230ec84e2eb"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);