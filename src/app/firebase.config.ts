import * as firebase from "firebase"; 

// Initialize Firebase
    export var firebaseConfig = {
      /*apiKey: "AIzaSyBiMgfyZ_izdFKLDl05vftWixxaS6xKIyM",
      authDomain: "app-agua-utfpr.firebaseapp.com",
      databaseURL: "https://app-agua-utfpr.firebaseio.com",
      projectId: "app-agua-utfpr",
      storageBucket: "app-agua-utfpr.appspot.com",
      messagingSenderId: "142712018169"*/

      // conta de teste Firebase (appaguas@gmail.com)
      apiKey: "AIzaSyAaiobOgYPey-2zhvXCt6XOyZutpBBpml4",
      authDomain: "appaguas-utfpr.firebaseapp.com",
      databaseURL: "https://appaguas-utfpr.firebaseio.com",
      projectId: "appaguas-utfpr",
      storageBucket: "",
      messagingSenderId: "7612106731"

      /*apiKey: "AIzaSyC8IfiS0RazzpNOZsWkHe8NcuiqyfqpWwk",
      authDomain: "app-desperdicio.firebaseapp.com",
      databaseURL: "https://app-desperdicio.firebaseio.com",
      projectId: "app-desperdicio",
      storageBucket: "app-desperdicio.appspot.com",
      messagingSenderId: "402861801348"*/
    };
    firebase.initializeApp(firebaseConfig);

    export var firebaseDatabase = firebase.database();
    export var timestamp = firebase.database.ServerValue.TIMESTAMP;
