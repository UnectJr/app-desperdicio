import * as firebase from "firebase"; 

// Initialize Firebase
    export var  firebaseConfig = {
      apiKey: "AIzaSyBBoXykJeL6R5V9CF-blJmclL8W5iWif6c",
      authDomain: "projetoextensaoutfpr-80b0e.firebaseapp.com",
      databaseURL: "https://projetoextensaoutfpr-80b0e.firebaseio.com",
      projectId: "projetoextensaoutfpr-80b0e",
      storageBucket: "projetoextensaoutfpr-80b0e.appspot.com",
      messagingSenderId: "251315204523"
    };
    firebase.initializeApp(firebaseConfig);

    export var firebaseDatabase = firebase.database();
    export var timestamp = firebase.database.ServerValue.TIMESTAMP;
