import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-native';
import { newGameData } from '../../../Utils/newGameData';
import Loading from '../Loding/Loading';
const check = (arr, str) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === str) return true;
  }
  return false;
};
const FindOne = () => {
  const [options, setoptions] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
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
    setloading(true);
    firebase
      .firestore()
      .collection('Games')
      .get()
      .then(res => {
        let found = false;
        res.forEach(item => {
          console.log(item.id);
          if (
            !item.data().close &&
            !found &&
            item.data().price === price &&
            item.data().person.length <= 3
          ) {
            console.log(item.data());
            let person = item.data().person;
            let color = 'red';
            if (!check(person, 'green')) {
              color = 'green';
            } else if (!check(person, 'purple')) {
              color = 'purple';
            } else if (!check(person, 'blue')) {
              color = 'blue';
            }

            firebase
              .firestore()
              .collection('Games')
              .doc(item.id)
              .update({
                person: [...person, color],
              });
            //   console.log(color)
            let payload = {
              gameId: item.id,
              color,
            };
            console.log(payload);
            dispatch({
              type: 'NEW_GAME',
              payload: { ...payload },
            });
            found = true;

            history.push('/play');
          }

          setloading(false);

        });
      });

    // console.log('[res id]', res.id);
  };

  if (loading) {
    return (
      <Loading />
    )
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

export default FindOne;
