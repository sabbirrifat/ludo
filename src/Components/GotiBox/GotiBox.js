import React, { useRef, useState } from 'react';
import firebase from 'firebase';
import { View, Animated, Image } from 'react-native';
import { useSelector } from 'react-redux';
const GotiBox = ({ color, scale, left }) => {
  // const [active, setactive] = useState(false);
  // const gameId = 'YRD2BHpHnEKob0qMUc9U';
  const gameId = useSelector(state => state.game.gameId);

  // firebase.firestore().collection('Games').doc(gameId).onSnapshot(res => {
  //     if (res.data().chal === color) {
  //         setactive(true);
  //         console.log(res.data().chal)
  //     }
  //     else setactive(false);
  // })
  //   console.log(color)

  const name =
    color === 'red'
      ? 'red'
      : color === 'purple'
        ? 'purple'
        : color === 'green'
          ? 'green'
          : 'blue';

  const nowchal = useSelector(state => state.game.nowChal);
  // console.log(nowchal)
  const active = nowchal === name;

  return (
    <View
      style={{
        transform: [{ scale: active ? 0.8 : scale ? scale - 0.1 : 0.7 }],
        marginLeft: left ? left : -10,
        marginTop: -3,
        // justifyContent : 'center',
        // flexDirection : 'row'
      }}>
      {name === 'red' ? (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: -10,
            // left: -10,
          }}
          source={require('../../Assets/Icons/pawnred.png')}
        />
      ) : name === 'green' ? (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: -20,
          }}
          source={require('../../Assets/Icons/pawngreen.png')}
        />
      ) : name === 'blue' ? (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: -20,
          }}
          source={require('../../Assets/Icons/pawnblue.png')}
        />
      ) : (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: -20,
          }}
          source={require('../../Assets/Icons/pawnpurple.png')}
        />
      )}

      {/* <View
                style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -5,
                }}>
                <View
                    style={{
                        backgroundColor: color,
                        height: 15,
                        width: 15,
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 20,
                        zIndex: 100,
                        position: 'absolute',
                        left: 6,
                        transform: [
                            // {transformX : 20}
                        ],
                    }}
                />

                <View
                    style={{
                        backgroundColor: color,
                        height: 20,
                        width: 20,
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 20,
                        position: 'absolute',
                        zIndex: 99,
                        top: 4,
                        left: 4,
                    }}
                />
            </View> */}
    </View>
  );
};
export default GotiBox;
