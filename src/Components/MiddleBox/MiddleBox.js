import React from 'react';
import {Image, View} from 'react-native';

const MiddleBox = ({style}) => {
  return (
    <View
      style={{
        ...style,
      }}>
      <Image
        style={{
          height: '100%',
          width: '100%',
        }}
        source={require('../../Assets/Img/underbox.png')}
      />
    </View>
  );
};

export default MiddleBox;
