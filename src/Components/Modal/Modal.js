import React from 'react';
import {Dimensions, Image, Pressable, SafeAreaView, View} from 'react-native';
import firebase from 'firebase';
const ModalF = ({children, open, setopen}) => {
  
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#000000d4',
        zIndex: 1000,
        transform: [{scale: open ? 1 : 0}],
      }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => setopen(false)}
          style={{
            height: 40,
            width: 40,
            // borderRadius: 40,
            marginTop: 20,

            backgroundColor: 'black',
          }}>
          <Image
            // onPress={() => console.log(1)}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
            }}
            source={require('../../Assets/Icons/cross.png')}
          />
        </Pressable>
      </View>
      {open ? children : null}
    </SafeAreaView>
  );
};

export default ModalF;
