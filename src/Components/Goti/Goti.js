import React from 'react';
import {Image, View} from 'react-native';
const Goti = ({color}) => {
  const name =
    color === 'red'
      ? 'red'
      : color === 'purple'
      ? 'purple'
      : color === 'rgb(0, 191, 89)'
      ? 'green'
      : 'blue';

  const pawn = '../../Assets/Icons/pawn' + name + '.png';
  return (
    <View>
      {name === 'red' ? (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: -20,
            left: -10,
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
            left: -10,
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
            left: -10,
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
            left: -10,
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
export default Goti;
