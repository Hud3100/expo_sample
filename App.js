import React, { Component, useEffect, useState } from 'react';
import RouterComponent from './Router';
import firebase from 'firebase';
import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black
} from '@expo-google-fonts/noto-sans-jp'
import AppLoading from 'expo-app-loading';

const app = () => {
  const [isloggedIn, setloggedIn] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDQvk5_yr1A5gRmVKKchksQ3mCONAjb3zA",
        authDomain: "kokotoba-335e6.firebaseapp.com",
        projectId: "kokotoba-335e6",
        storageBucket: "kokotoba-335e6.appspot.com",
        messagingSenderId: "172079050691",
        appId: "1:172079050691:web:978b3ef3497bbdfdcfd776",
      });
    }
  }, []);

  let [fontsLoaded] = useFonts({
    NotoSansJP_100Thin,
    NotoSansJP_300Light,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    NotoSansJP_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <RouterComponent />
  )
};

export default app;
