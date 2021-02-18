import React, { Component } from 'react';
import RouterComponent from './Router';
import firebase from 'firebase';

class App extends Component {
  state = { isloggedIn: null};

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDQvk5_yr1A5gRmVKKchksQ3mCONAjb3zA",
        authDomain: "kokotoba-335e6.firebaseapp.com",
        projectId: "kokotoba-335e6",
        storageBucket: "kokotoba-335e6.appspot.com",
        messagingSenderId: "172079050691",
        appId: "1:172079050691:web:978b3ef3497bbdfdcfd776"
      });
    }
  }

  render() {
    return (
      <RouterComponent />
    )
  }
}
export default App;