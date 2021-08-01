import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, Dimensions } from 'react-native'
import Home from './src/Routes/Home/Home'
import Play from './src/Routes/Play/Play'
import _ from 'denodeify'
import { NativeRouter, Route, useHistory } from 'react-router-native'
import Login from './src/Components/Login/Login'
import Registration from './src/Components/Registration/Registration'
import PrivateRoute from './Utils/PrivateRoute'
import { useDispatch } from 'react-redux'
import firebase from 'firebase'
const App = () => {
  const history = useHistory();
  const [loading, setloading] = useState(true);
  // history.push('/login');
  const dispatch = useDispatch();
  const userSettings = async () => {
    console.log('2332234')


    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        dispatch({
              type: 'LOGIN',
              payload: {
                username: user.email,
                id: user.uid,
                coin: 0,
              }
            })
      }
      else{
        history.push('/login');
      }
      setloading(false);
    })

  }
  userSettings();

  if (loading) {
    return <SafeAreaView></SafeAreaView>
  }

  return (
    <SafeAreaView>
      <Route component={Play} path="/play" exact />
      <Route component={Home} path="/" exact />
      <Route component={Login} path="/login" exact />
      <Route component={Registration} path="/registration" />
    </SafeAreaView>
  )
}

export default App
