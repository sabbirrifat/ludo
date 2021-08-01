import React from 'react';
import {Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-native';
import firebase from 'firebase';
const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = async () => {
    await firebase.auth().signOut();

    dispatch({
      type: 'LOGOUT',
    });

    history.push('/login');
  };

  return (
    <Pressable
      onPress={logout}
      style={{
        height: 40,
        width: 150,
        backgroundColor: '#001f3f',
        borderRadius: 40,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 40,
        }}>
        LOGOUT
      </Text>
    </Pressable>
  );
};

export default Logout;
