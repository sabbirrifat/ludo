import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {changeDone, diceRoll, done} from '../../../Utils/ludoLogics';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
const DiceRolling = ({
  value,
  setvalue,
  disable,
  now,
  setdicedisable,
  gamedata,
}) => {
  const [nowvalue, setnowvalue] = useState(6);
  const [given, setgiven] = useState(0);
  const gameid = useSelector(state => state.game.gameId);
  const [chal, setchal] = useState('');
  const dispatch = useDispatch();
  const [six, setsix] = useState(0);
  // console.log('[setdicedisable :- ',setdicedisable)
  // setdicedisable(false)
  // console.log(disable)
  useEffect(() => {
    firebase
      .firestore()
      .collection('Games')
      .doc(gameid)
      .onSnapshot(res => {
        setgiven(res.data().given);
        setnowvalue(res.data().given);
        setchal(res.data().chal);
        setsix(res.data().sixcount);
      });
    //   setdicedisable(false)
  }, []);
  //   console.log(given)
  //   console.log(six);

  const dice = async () => {
    let main = 3;

    await firebase
      .firestore()
      .collection('Games')
      .doc(gameid)
      .get()
      .then(async res => {
        setsix(res.data().sixcount);
        if (res.data().sixcount >= 2) {
          main = 5;
          console.log('changed');
          await firebase.firestore().collection('Games').doc(gameid).update({
            sixcount: 0,
          });
        }
      });

    console.log('[dice is rolling]', main);
    await firebase
      .firestore()
      .collection('Games')
      .doc(gameid)
      .update({
        given: main,
      })
      .then(async res => {
        setdicedisable(true);
        setvalue(main);
        if (main !== 6 && changeDone(chal, gamedata, setdicedisable, gameid)) {
          await done(gameid, chal);
        }
        else if (main === 6) {
          const ab = six + 1;
          firebase
            .firestore()
            .collection('Games')
            .doc(gameid)
            .update({
              sixcount: ab,
            })
            .then(res => {
              setsix(ab);
            });
        }
      });
      setnowvalue(main)
  };

  // console.log(now);

  if (now == false) {
    return <View></View>;
  }
  return (
    <Pressable
      onPress={disable ? null : dice}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Text
        style={{
          fontSize: 25,
          color: 'white',
          fontWeight: 'bold',
        }}>
        {nowvalue}
      </Text>
    </Pressable>
  );
};

export default DiceRolling;
