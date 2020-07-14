import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDXa0fgtPdooYjor8GB3xIVD_HZyxKBftU",
    authDomain: "chatapp-1fe70.firebaseapp.com",
    databaseURL: "https://chatapp-1fe70.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();