import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, useHistory } from 'react-router-native';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [notification, setnotification] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const user = useSelector(state => state.user);
  // console.log(user);
  if (user.username) history.push('/');
  const loginPress = () => {
    setloading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(login, password)
      .then(user => {
        dispatch({
          type: 'LOGIN',
          payload: {
            username: user.user.email,
            id: user.user.uid,
            coin: 0,
          }
        });
        history.push('/');
      })
      .catch(err => {
        setnotification('email or password is wrong');
        setloading(false);
      });
  };
  return (
    <View>
      {/* <Text>login</Text> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            transform: [{ scale: 0.7 }],
          }}
          source={require('../../Assets/Img/ludoAb.png')}
        />
      </View>
      <View
        style={{
          height: 50,
          width: Dimensions.get('window').width - 80,
          borderWidth: 1,
          borderColor: '#ccc',
          marginLeft: 40,
          flexDirection: 'row',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '15%',
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
            }}
            source={require('../../Assets/Icons/profilex.png')}
          />
        </View>
        <TextInput
          placeholder="Email"
          style={{
            height: '100%',
            width: '85%',
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: '#ccc',
          }}
          placeholderTextColor="#262626"
          value={login}
          onChangeText={text => setlogin(text)}
        />
      </View>

      <View
        style={{
          height: 50,
          width: Dimensions.get('window').width - 80,
          borderWidth: 1,
          borderColor: '#ccc',
          marginLeft: 40,
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '15%',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../../Assets/Icons/lock.png')}
          />
        </View>
        <TextInput
          placeholder="Password"
          style={{
            height: '100%',
            width: '85%',
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: '#ccc',
          }}
          placeholderTextColor="#262626"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setpassword(text)}
        />
      </View>
      <View
        style={{
          height: 30,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'red',
            marginTop: 5,
          }}>
          {notification}
        </Text>
      </View>
      <TouchableOpacity
        onPress={loginPress}
        style={{
          width: Dimensions.get('window').width - 80,
          marginLeft: 40,
          backgroundColor: '#085ED6',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {
            loading ? <ActivityIndicator /> : "SIGN IN"
          }
        </Text>
      </TouchableOpacity>
      <Text
        onPress={() => history.push('/registration')}
        style={{
          color: '#085ED6',
          textAlign: 'center',
          fontSize: 16,
          marginTop: 60,
        }}>
        Don't have an account? Create here
      </Text>
    </View>
  );
};

export default Login;
