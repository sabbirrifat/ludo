import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {boardxx} from '../../../Utils/board';
import Goti from '../Goti/Goti';
import GotiBox from '../GotiBox/GotiBox';
import firebase from 'firebase';
import {
  available,
  changeDone,
  done,
  myChalNow,
  newFromBox,
  nextGo,
} from '../../../Utils/ludoLogics';
import DiceRolling from '../DiceRolling/DiceRolling';
import Loading from '../Loding/Loading';
import MiddleBox from '../MiddleBox/MiddleBox';
const widthh = Dimensions.get('window').width - 20;
const color1 = 'red';
const color2 = 'rgb(0, 191, 89)';
const color3 = 'rgb(0, 100, 207)';
const color4 = 'purple';
const perbox = widthh / 15;
const check1 = (i, j) => {
  if (i === 1 && j !== 0) return color2;
  else if (i === 2 && j === 1) return color2;
  return 'transparent';
};
const check2 = (i, j) => {
  if (i === 1 && j !== 5) return color3;
  else if (i === 0 && j === 4) return color3;
  return 'transparent';
};

const check3 = (i, j) => {
  if (i === 1 && j !== 0) return color1;
  else if (i === 0 && j === 1) return color1;
  return 'transparent';
};
const check4 = (i, j) => {
  if (i === 1 && j !== 5) return color4;
  else if (i === 2 && j === 4) return color4;
  return 'transparent';
};

const Game = () => {
  const [pos, setpos] = useState(useSelector(state => state.game.pos));
  const [loading, setloading] = useState(true);
  const [first, setfirest] = useState(0);
  const [colors, setcolors] = useState([]);
  const [gamedata, setgamedata] = useState({});
  const [chal, setchal] = useState('red');
  const mycolor = useSelector(state => state.game.color);
  const dispatch = useDispatch();
  const [value, setvalue] = useState(6);
  const [dice, setdice] = useState(6);
  const [dicedisable, setdicedisable] = useState(false);
  const [pressed, setpressed] = useState(0);
  const [chalxx, setchalxx] = useState(false);
  const gameid = useSelector(state=>state.game.gameId);
  useEffect(async () => {
    await firebase
      .firestore()
      .collection('Games')
      .doc(gameid)
      .onSnapshot(async res => {
        setgamedata(res.data());
        setloading(false);
        setpos(res.data().pos);
        setchal(res.data().chal);
        dispatch({
          type: 'COLOR_SET',
          payload: res.data().chal,
        });
        dispatch({
          type: 'NOW_CHAL',
          color: res.data().chal,
        });
      });
  }, []);
  if (chal === mycolor) {
    // myChalNow(mycolor, setdicedisable, value, setvalue);
  }

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < pos.length; i++) {
      let bt = [];
      for (let j = 0; j < pos[i].red; j++) {
        bt.push('red');
      }
      for (let j = 0; j < pos[i].green; j++) {
        bt.push('green');
      }
      for (let j = 0; j < pos[i].purple; j++) {
        bt.push('purple');
      }
      for (let j = 0; j < pos[i].blue; j++) {
        bt.push('blue');
      }

      temp.push([...bt]);
    }

    setcolors([...temp]);
  }, [pos]);
  const newPawnBox = color => {
    if (color !== chal) return;
    if (dicedisable === false) return;
    newFromBox(setdicedisable, pos, gameid, gamedata, chal, value);
  };
  const chalDe = async x => {
    console.log(x);
    if (dicedisable === false) return;
    if (chalxx === true) return;
    setchalxx(true);
    // setdicedisable(false)
    // console.log(x);
    if (!available(x, chal, pos, colors, value, gamedata)) {
      console.warn('[not possible]');
      setchalxx(false);

      return;
    }
    if (changeDone(chal, gamedata, setdicedisable, gameid)) {
      setchalxx(false);

      return;
    }
    await myChalNow(
      mycolor,
      setdicedisable,
      value,
      setvalue,
      x,
      colors,
      gameid,
      pos,
      gamedata,
      setchalxx,
    );
    console.log(dicedisable);
  };

  const bpos = boardxx();
  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <View
        style={{
          height: Dimensions.get('window').width + 200,
          position: 'absolute',
          width: Dimensions.get('window').width,
          top: Dimensions.get('window').height / 2,
          // backgroundColor: 'red',
          transform: [
            {translateY: -(Dimensions.get('window').width + 200) / 2},
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <View
            style={{
              backgroundColor: color1,
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'red'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
          <View
            style={{
              backgroundColor: color2,
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'green'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
        </View>
        <View style={styles.root}>
          {/* <Text>{first}</Text> */}
          {/* <Button onPress={() => done(gameid, chal)} title="ad"></Button> */}

          <View style={styles.openbar}>
            <Pressable
              onPress={newPawnBox}
              style={{...styles.box, backgroundColor: 'red'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 1 ? <Goti color="red" /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 2 ? <Goti color="red" /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 3 ? <Goti color="red" /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 4 ? <Goti color="red" /> : null}
                  </Pressable>
                </View>
              </View>
            </Pressable>
            {/* pawn road */}
            <View
              style={{
                ...styles.endland,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {[0, 1, 2].map((itemx, key) => (
                <View
                  style={{
                    height: perbox * 6,
                    width: perbox,
                  }}>
                  {[0, 1, 2, 3, 4, 5].map(itemy => (
                    <Pressable
                      style={{
                        height: perbox,
                        width: perbox,
                        borderTopWidth: 0.5,
                        borderBottomWidth: itemy === 5 ? 0.5 : 0,
                        borderRightWidth: itemx === 2 ? 0 : 0.5,
                        position: 'relative',
                        backgroundColor: check1(itemx, itemy),
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[2][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                        }}
                      />

                      {itemx === 0 && itemy == 1 ? (
                        <View>
                          <Image
                            style={{
                              position: 'absolute',
                              height: perbox - 4,
                              width: perbox - 4,
                              margin: 2,
                              zIndex: 0,
                              zIndex: 0,
                              zIndex: -100,
                            }}
                            source={require('../../Assets/Icons/star.png')}
                          />
                          {/* <GotiBox active={ab} color={color1} /> */}
                        </View>
                      ) : null}
                      {/* <Text>{bpos[2][itemx][itemy]}</Text> */}

                      <View
                        style={{
                          position: 'absolute',
                        }}>
                        {colors[bpos[2][itemx][itemy]].map((item, i) => (
                          <GotiBox
                            scale={
                              colors[bpos[2][itemx][itemy]].length > 1
                                ? 0.7
                                : null
                            }
                            left={
                              colors[bpos[2][itemx][itemy]].length > 1 &&
                              colors[bpos[2][itemx][itemy]].length < 5
                                ? -i * 5
                                : colors[bpos[2][itemx][itemy]].length > 1
                                ? -i * 1
                                : null
                            }
                            color={item}
                          />
                        ))}
                      </View>

                      {/* hello world */}
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>

            <View style={{...styles.box, backgroundColor: 'rgb(0, 191, 89)'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 1 ? <Goti color={color2} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 2 ? <Goti color={color2} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 3 ? <Goti color={color2} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 4 ? <Goti color={color2} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* middle part */}
          <View
            style={{
              height: (widthh / 15) * 3,
              width: widthh,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: perbox * 6,
                height: perbox * 3,
              }}>
              {[0, 1, 2].map(itemx => (
                <View
                  style={{
                    height: perbox,
                    width: perbox * 6,
                    flexDirection: 'row',
                  }}>
                  {[0, 1, 2, 3, 4, 5].map((itemy, ix) => (
                    <Pressable
                      // onPress={() => {
                      //   chal === mycolor ? chalDe(bpos[1][itemx][itemy]) : null;
                      // }}
                      style={{
                        height: perbox,
                        width: perbox,
                        borderLeftWidth: 0.5,
                        borderRightWidth: itemy === 5 ? 0.5 : 0,
                        borderBottomWidth: itemx !== 2 ? 0.5 : 0,
                        backgroundColor: check3(itemx, itemy),
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[1][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                          // backgroundColor : "yellow"
                        }}
                      />
                      {itemx === 2 && itemy == 1 ? (
                        <Image
                          style={{
                            position: 'absolute',
                            height: perbox - 4,
                            width: perbox - 4,
                            margin: 2,
                            zIndex: -100,
                          }}
                          source={require('../../Assets/Icons/star.png')}
                        />
                      ) : null}
                      {/* <Text>{bpos[1][itemx][itemy]}</Text> */}

                      <View
                        style={{
                          position: 'absolute',
                          zIndex: -100,
                        }}>
                        {colors[bpos[1][itemx][itemy]].map((item, i) => (
                          <GotiBox
                            scale={
                              colors[bpos[1][itemx][itemy]].length > 1
                                ? 0.7
                                : null
                            }
                            left={
                              colors[bpos[1][itemx][itemy]].length > 1 &&
                              colors[bpos[1][itemx][itemy]].length < 5
                                ? -i * 5
                                : colors[bpos[1][itemx][itemy]].length > 1
                                ? -i * 1
                                : null
                            }
                            color={item}
                          />
                        ))}
                      </View>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View> 
            {/* <Text>hello</Text> */}

            <MiddleBox
              style={{
                height : perbox*3,
                width : perbox*3,
              }}
            />


            <View
              style={{
                width: perbox * 6,
                height: perbox * 3,
              }}>
              {[0, 1, 2].map(itemx => (
                <View
                  style={{
                    height: perbox,
                    width: perbox * 6,
                    flexDirection: 'row',
                  }}>
                  {[0, 1, 2, 3, 4, 5].map(itemy => (
                    <Pressable
                      // onPress={() => {
                      //   chal === mycolor ? chalDe(bpos[3][itemx][itemy]) : null;
                      // }}
                      style={{
                        height: perbox,
                        width: perbox,
                        borderLeftWidth: 0.5,
                        borderRightWidth: itemy === 5 ? 0.5 : 0,
                        borderBottomWidth: itemx !== 2 ? 0.5 : 0,
                        backgroundColor: check4(itemx, itemy),
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[3][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                        }}
                      />
                      {itemx === 0 && itemy == 4 ? (
                        <Image
                          style={{
                            position: 'absolute',
                            height: perbox - 4,
                            width: perbox - 4,
                            margin: 2,
                            zIndex: -100,
                          }}
                          source={require('../../Assets/Icons/star.png')}
                        />
                      ) : null}
                      {/* <Text>{bpos[3][itemx][itemy]}</Text> */}

                      <View
                        style={{
                          position: 'absolute',
                        }}>
                        {colors[bpos[3][itemx][itemy]].map((item, i) => (
                          <GotiBox
                            scale={
                              colors[bpos[3][itemx][itemy]].length > 1
                                ? 0.7
                                : null
                            }
                            left={
                              colors[bpos[3][itemx][itemy]].length > 1 &&
                              colors[bpos[3][itemx][itemy]].length < 5
                                ? -i * 5
                                : colors[bpos[1][itemx][itemy]].length > 1
                                ? -i * 1
                                : null
                            }
                            color={item}
                          />
                        ))}
                      </View>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.openbar}>
            <View style={{...styles.box, backgroundColor: 'rgb(0, 100, 207)'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 1 ? <Goti color={color3} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 2 ? <Goti color={color3} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 3 ? <Goti color={color3} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 4 ? <Goti color={color3} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.endland}>
              <View
                style={{
                  ...styles.endland,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {[0, 1, 2].map((itemx, key) => (
                  <View
                    style={{
                      height: perbox * 6,
                      width: perbox,
                    }}>
                    {[0, 1, 2, 3, 4, 5].map(itemy => (
                      <Pressable
                        // onPress={() => {
                        //   chal === mycolor ? chalDe(bpos[4][itemx][itemy]) : null;
                        // }}
                        style={{
                          height: perbox,
                          width: perbox,
                          borderTopWidth: 0.5,
                          borderBottomWidth: itemy === 5 ? 0.5 : 0,
                          borderRightWidth: itemx === 2 ? 0 : 0.5,
                          position: 'relative',
                          backgroundColor: check2(itemx, itemy),
                        }}>
                        <Pressable
                          onPress={() => {
                            chal === mycolor
                              ? chalDe(bpos[4][itemx][itemy])
                              : null;
                          }}
                          style={{
                            height: perbox,
                            width: perbox,
                            position: 'absolute',
                            zIndex: 1000000,
                          }}
                        />
                        {itemx === 2 && itemy == 4 ? (
                          <Image
                            style={{
                              position: 'absolute',
                              height: perbox - 4,
                              width: perbox - 4,
                              margin: 2,
                              zIndex: -100,
                            }}
                            source={require('../../Assets/Icons/star.png')}
                          />
                        ) : null}

                        {/* <Text>{bpos[4][itemx][itemy]}</Text> */}

                        <View
                          style={{
                            position: 'absolute',
                          }}>
                          {colors[bpos[4][itemx][itemy]].map((item, i) => (
                            <GotiBox
                              scale={
                                colors[bpos[4][itemx][itemy]].length > 1
                                  ? 0.7
                                  : null
                              }
                              left={
                                colors[bpos[4][itemx][itemy]].length > 1 &&
                                colors[bpos[4][itemx][itemy]].length < 5
                                  ? -i * 5
                                  : colors[bpos[1][itemx][itemy]].length > 1
                                  ? -i * 1
                                  : null
                              }
                              color={item}
                            />
                          ))}
                        </View>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            <View style={{...styles.box, backgroundColor: color4}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 1 ? <Goti color={color4} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 2 ? <Goti color={color4} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 3 ? <Goti color={color4} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 4 ? <Goti color={color4} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <View
            style={{
              backgroundColor: color3,
              height: 80,
              width: 80,
              marginTop: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'blue'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
          <View
            style={{
              backgroundColor: color4,
              height: 80,
              width: 80,
              marginTop: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'purple'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
        </View>
      </View>

      {/* second para */}

      <View
        style={{
          height: Dimensions.get('window').width + 200,
          position: 'absolute',
          width: Dimensions.get('window').width,
          top: Dimensions.get('window').height / 2,
          // backgroundColor: 'red',
          transform: [
            {translateY: -(Dimensions.get('window').width + 200) / 2},
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <View
            style={{
              backgroundColor: color1,
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'red'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
          <View
            style={{
              backgroundColor: color2,
              height: 80,
              width: 80,
              marginBottom: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'green'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
        </View>
        <View style={styles.root}>
          {/* <Text>{first}</Text> */}
          {/* <Button onPress={() => done(gameid, chal)} title="ad"></Button> */}

          <View style={styles.openbar}>
            <Pressable
              onPress={newPawnBox}
              style={{...styles.box, backgroundColor: 'transparent'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 1 ? <Goti color="red" /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 2 ? <Goti color="red" /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 3 ? <Goti color="red" /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('red')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'red',
                    }}>
                    {gamedata.RedBox >= 4 ? <Goti color="red" /> : null}
                  </Pressable>
                </View>
              </View>
            </Pressable>
            {/* pawn road */}
            <View
              style={{
                ...styles.endland,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {[0, 1, 2].map((itemx, key) => (
                <View
                  style={{
                    height: perbox * 6,
                    width: perbox,
                  }}>
                  {[0, 1, 2, 3, 4, 5].map(itemy => (
                    <Pressable
                      style={{
                        height: perbox,
                        width: perbox,
                        position: 'relative',
                        backgroundColor: 'transparent',
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[2][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                          // backgroundColor : 'red'
                        }}
                      />

                      {/* hello world */}
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>

            <View style={{...styles.box, backgroundColor: 'transparent'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 1 ? <Goti color={color2} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 2 ? <Goti color={color2} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 3 ? <Goti color={color2} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('green')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 191, 89)',
                    }}>
                    {gamedata.GreenBox >= 4 ? <Goti color={color2} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* middle part */}
          <View
            style={{
              height: (widthh / 15) * 3,
              width: widthh,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: perbox * 6,
                height: perbox * 3,
              }}>
              {[0, 1, 2].map(itemx => (
                <View
                  style={{
                    height: perbox,
                    width: perbox * 6,
                    flexDirection: 'row',
                  }}>
                  {[0, 1, 2, 3, 4, 5].map((itemy, ix) => (
                    <Pressable
                      // onPress={() => {
                      //   chal === mycolor ? chalDe(bpos[1][itemx][itemy]) : null;
                      // }}
                      style={{
                        height: perbox,
                        width: perbox,
                        backgroundColor: 'transparent',
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[1][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>

            <View
              style={{
                width: perbox * 6,
                height: perbox * 3,
              }}>
              {[0, 1, 2].map(itemx => (
                <View
                  style={{
                    height: perbox,
                    width: perbox * 6,
                    flexDirection: 'row',
                  }}>
                  {[0, 1, 2, 3, 4, 5].map(itemy => (
                    <Pressable
                      // onPress={() => {
                      //   chal === mycolor ? chalDe(bpos[3][itemx][itemy]) : null;
                      // }}
                      style={{
                        height: perbox,
                        width: perbox,
                        backgroundColor: 'transparent',
                      }}>
                      <Pressable
                        onPress={() => {
                          chal === mycolor
                            ? chalDe(bpos[3][itemx][itemy])
                            : null;
                        }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'absolute',
                          zIndex: 1000000,
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.openbar}>
            <View style={{...styles.box, backgroundColor: 'transparent'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 1 ? <Goti color={color3} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 2 ? <Goti color={color3} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 3 ? <Goti color={color3} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('blue')}
                    style={{
                      ...styles.goti,
                      backgroundColor: 'rgb(0, 100, 207)',
                    }}>
                    {gamedata.BlueBox >= 4 ? <Goti color={color3} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.endland}>
              <View
                style={{
                  ...styles.endland,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {[0, 1, 2].map((itemx, key) => (
                  <View
                    style={{
                      height: perbox * 6,
                      width: perbox,
                    }}>
                    {[0, 1, 2, 3, 4, 5].map(itemy => (
                      <Pressable
                        // onPress={() => {
                        //   chal === mycolor ? chalDe(bpos[4][itemx][itemy]) : null;
                        // }}
                        style={{
                          height: perbox,
                          width: perbox,
                          position: 'relative',
                          backgroundColor: 'transparent',
                        }}>
                        <Pressable
                          onPress={() => {
                            chal === mycolor
                              ? chalDe(bpos[4][itemx][itemy])
                              : null;
                          }}
                          style={{
                            height: perbox,
                            width: perbox,
                            position: 'absolute',
                            zIndex: 1000000,
                            backgroundColor: 'transparent',
                          }}
                        />
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            <View style={{...styles.box, backgroundColor: 'transparent'}}>
              <View style={{...styles.underbox}}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 1 ? <Goti color={color4} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 2 ? <Goti color={color4} /> : null}
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 3 ? <Goti color={color4} /> : null}
                  </Pressable>
                  <Pressable
                    onPress={() => newPawnBox('purple')}
                    style={{
                      ...styles.goti,
                      backgroundColor: color4,
                    }}>
                    {gamedata.PurpleBox >= 4 ? <Goti color={color4} /> : null}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <View
            style={{
              backgroundColor: color3,
              height: 80,
              width: 80,
              marginTop: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'blue'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
          <View
            style={{
              backgroundColor: color4,
              height: 80,
              width: 80,
              marginTop: 10,
              borderRadius: 8,
            }}>
            <DiceRolling
              now={chal === 'purple'}
              value={value}
              setvalue={setvalue}
              setdicedisable={setdicedisable}
              disable={mycolor === chal ? dicedisable : true}
              gamedata={gamedata}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    height: Dimensions.get('window').width - 20,
    width: Dimensions.get('window').width - 20,
    // backgroundColor: 'black',
    // backgroundColor: 'red',
    marginLeft: 10,
  },
  box: {
    width: (widthh / 15) * 6,
    height: (widthh / 15) * 6,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endland: {
    width: (widthh / 15) * 3,
  },
  underbox: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
  },
  goti: {
    height: 30,
    width: 30,
    marginTop: 13,
    marginLeft: 13,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'relative',
  },
});

export default Game;
