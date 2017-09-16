import * as firebase from "firebase"; 

// Initialize Firebase
    export var firebaseConfig = {
      apiKey: "AIzaSyBiMgfyZ_izdFKLDl05vftWixxaS6xKIyM",
      authDomain: "app-agua-utfpr.firebaseapp.com",
      databaseURL: "https://app-agua-utfpr.firebaseio.com",
      projectId: "app-agua-utfpr",
      storageBucket: "app-agua-utfpr.appspot.com",
      messagingSenderId: "142712018169"
    };
    firebase.initializeApp(firebaseConfig);

    export var firebaseDatabase = firebase.database();
