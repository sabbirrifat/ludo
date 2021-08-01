import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Dimensions} from 'react-native';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-native';
import {newGameData} from '../../../Utils/newGameData';
import Loading from '../../Components/Loding/Loading';
const StartNew = () => {
  const user = useSelector(state => state.user);
  //   console.log(user);
  const [loading, setloading] = useState(true);
  const [options, setoptions] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(async () => {
    await firebase
      .firestore()
      .collection('GameOptions')
      .get()
      .then(async res => {
        let temp = [];
        await res.forEach(item => {
          temp.push(item.data().value);
        });
        temp.sort();
        setoptions([...temp]);
        setloading(false);
      });
  }, []);
  const addGames = async price => {
    firebase
      .firestore()
      .collection('Games')
      .add({
        ...newGameData,
        price,
        userid: user.id,
      })
      .then(res => {
        dispatch({
          type: 'NEW_GAME',
          payload: {
            gameId: res.id,
          },
        });
        history.push('/play');
      })
      .catch(err => {
        console.warn('error');
        console.log(err);
      });

    // console.log('[res id]', res.id);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 100,
      }}>
      {options.map(item => (
        <Pressable
          onPress={() => addGames(item)}
          style={{
            height: 80,
            width: Dimensions.get('window').width - 80,
            backgroundColor: '#001f3f',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default StartNew;
