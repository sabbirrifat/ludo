import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-native';
import {gmailToUserName} from '../../../Utils/gmailToUserName';
import Logout from '../Logout/Logout';
const ProfileBar = () => {
  const [usercoin, setusercoin] = useState(0);
  const user = useSelector(state => state.user);
  const history = useHistory();
  if (!user) {
    history.push('/login');
    return <View></View>;
  }

  const username = gmailToUserName(user.username);

  useEffect(async () => {
    console.log('[profile bar]');
    // console.log(user);
    // if (!user.id) history.push('/login');
    if (user.id) {
      // console.warn('[hello world]', user.id);
      await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .onSnapshot(res => {
          // setusercoin(res.data().coin);
          // console.log('[i am hero]',res.data());
          if (res.data()) {
            setusercoin(res.data().coin);
          }
        });
    }
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems : 'center',
        }}>
        <Image
          style={{
            height: 80,
            width: 80,
            marginTop: 10,
            marginLeft: 10,
            borderRadius: 80,
          }}
          source={require('../../Assets/Icons/profilePic.png')}
        />
        <Text
          style={{
            marginTop: 20,
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 12,
            color: 'white',
          }}>
          {username}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#001f3f',
            width: 150,
            height: 40,
            justifyContent: 'space-between',
            borderRadius: 40,
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
            }}
            source={require('../../Assets/Icons/goldBuy.png')}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            {usercoin}
          </Text>
          <Image
            style={{
              height: 40,
              width: 40,
            }}
            source={require('../../Assets/Icons/goldShop.png')}
          />
        </View>
        <Logout />
      </View>
    </View>
  );
};

export default ProfileBar;
