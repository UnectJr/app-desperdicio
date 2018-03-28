import * as firebase from "firebase"; 

// Initialize Firebase
    export var firebaseConfig = {
      apiKey: "AIzaSyBiMgfyZ_izdFKLDl05vftWixxaS6xKIyM",
      authDomain: "app-agua-utfpr.firebaseapp.com",
      databaseURL: "https://app-agua-utfpr.firebaseio.com",
      projectId: "app-agua-utfpr",
      storageBucket: "app-agua-utfpr.appspot.com",
      messagingSenderId: "142712018169"

      /*apiKey: "AIzaSyDQFQ59lMT5wk4lFaJ0bUR0UnP0jVZ3IgQ",
      authDomain: "testewebchat-1a3fa.firebaseapp.com",
      databaseURL: "https://testewebchat-1a3fa.firebaseio.com",
      projectId: "testewebchat-1a3fa",
      storageBucket: "testewebchat-1a3fa.appspot.com",
      messagingSenderId: "128075295986"*/

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
