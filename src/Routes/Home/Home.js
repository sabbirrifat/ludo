import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  View,
  LogBox,
  Button
} from 'react-native';
import Advertisement from '../../Components/Advertisement/Advertisement';
import ProfileBar from '../../Components/ProfileBar/ProfileBar';
import ModalF from '../../Components/Modal/Modal';
import StartNew from '../../Components/StartNew/StartNew';
import FindOne from '../../Components/FindOne/FineOne';
import { useHistory } from 'react-router-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Home = () => {
  const [modal1, setmodal1] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const history = useHistory();
  history.push('/play')
  // console.log(modal1)

  return (
    <View>
      <ModalF open={modal1} setopen={setmodal1}>
        <StartNew />
      </ModalF>
      <ModalF open={modal2} setopen={setmodal2}>
        <FindOne />
      </ModalF>
      <ImageBackground
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={require('../../Assets/Img/bgpic.jpeg')}>
        <ProfileBar />
        <Pressable
          onPress={() => setmodal1(true)}
          style={{
            height: 80,
            width: Dimensions.get('window').width - 80,
            marginLeft: 40,
            backgroundColor: '#001f3f',
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Start new game
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setmodal2(true)}
          style={{
            height: 80,
            width: Dimensions.get('window').width - 80,
            marginLeft: 40,
            backgroundColor: '#001f3f',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Find Online
          </Text>
        </Pressable>
        <Button title="hello"/>

        <Advertisement />

      </ImageBackground>
    </View>
  );
};

export default Home;
