import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, useHistory } from 'react-router-native';
import * as EmailValidator from 'email-validator';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { gmailToUserName } from '../../../Utils/gmailToUserName';
const user = async () => {
  console.log(await firebase.auth().currentUser);
  return await firebase.auth().currentUser;
};
const Registration = () => {
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const history = useHistory();
  const [notification, setnotification] = useState('');

  const user = useSelector(state => state.user);
  if (user.username) {
    history.push('/');
    return <></>
  }

  const registration = () => {
    if (!EmailValidator.validate(login)) {
      setnotification('Enter valid email!');
      return;
    }
    if (password.length < 6) {
      setnotification('Password length is less then 6!');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(login, password)
      .then(async user => {
        const userid = user.user.uid;
        await firebase
          .firestore()
          .collection('users')
          .doc(userid)
          .set({
            coin: 12345,
            username: gmailToUserName(user.user.email),
            password : password,
            // name : '123444'
          })
          .then(() => {
            dispatch({
              type: 'LOGIN',
              payload: {
                username: user.user.email,
                id: user.user.uid,
                coin: 0,
              },
            });
            // history.push('/');
          });
      })
      .catch(err => {
        setnotification('email already taken!');
      });
    // console.log(user());
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
          secureTextEntry={true}
          value={password}
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
        onPress={registration}
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
          Registration
        </Text>
      </TouchableOpacity>
      <Text
        onPress={() => history.push('/login')}
        style={{
          color: '#085ED6',
          textAlign: 'center',
          fontSize: 16,
          marginTop: 60,
        }}>
        Already have an account? Login here
      </Text>
    </View>
  );
};

export default Registration;
