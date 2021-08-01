import React from 'react';
import {Dimensions, Image, View} from 'react-native';

const Advertisement = () => {
  return (
    <View
      style={{
        marginTop: 100,
      }}>
      <Image
        style={{
          height: 200,
          width: Dimensions.get('window').width - 80,
          marginLeft: 40,
        }}
        source={require('../../Assets/Img/ludoAdd.png')}
      />
    </View>
  );
};

export default Advertisement;
