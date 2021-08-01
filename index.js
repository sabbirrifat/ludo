/**
 * @format
 */
import React, { useEffect, useState } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/Redux/rootReducer';
import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';
import { NativeRouter } from 'react-router-native';
import axios from 'axios';
var firebaseConfig = {
  apiKey: 'AIzaSyCCQN01b1pisj7IuhtqSSnr6jaWYAoxQCQ',
  authDomain: 'ludo-913ff.firebaseapp.com',
  projectId: 'ludo-913ff',
  storageBucket: 'ludo-913ff.appspot.com',
  messagingSenderId: '814557495419',
  appId: '1:814557495419:web:9274c7c5f04bfd2c3aa2de',
  measurementId: 'G-2817JML1SQ',
};

const Root = () => {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics()


  return (
    <Provider store={store}>
      <NativeRouter>
        <App />
      </NativeRouter>
    </Provider>
  );
};



AppRegistry.registerComponent(appName, () => Root);
