// import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';

//below is result of warning message in DevTools
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDXa0fgtPdooYjor8GB3xIVD_HZyxKBftU",
    authDomain: "chatapp-1fe70.firebaseapp.com",
    databaseURL: "https://chatapp-1fe70.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();