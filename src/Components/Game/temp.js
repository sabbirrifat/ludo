<View
      style={{
        height: Dimensions.get('window').width + 200,
        position: 'absolute',
        width: Dimensions.get('window').width,
        top: Dimensions.get('window').height / 2,
        // backgroundColor: 'red',
        transform: [{translateY: -(Dimensions.get('window').width + 200) / 2}],
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
                        chal === mycolor ? chalDe(bpos[2][itemx][itemy]) : null;
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
                          }}
                          source={require('../../Assets/Icons/star.png')}
                        />
                        {/* <GotiBox active={ab} color={color1} /> */}
                      </View>
                    ) : null}
                    <Text>{bpos[2][itemx][itemy]}</Text>

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
                        chal === mycolor ? chalDe(bpos[1][itemx][itemy]) : null;
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
                        }}
                        source={require('../../Assets/Icons/star.png')}
                      />
                    ) : null}
                    <Text>{bpos[1][itemx][itemy]}</Text>

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
                        chal === mycolor ? chalDe(bpos[3][itemx][itemy]) : null;
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
                    <Text>{bpos[3][itemx][itemy]}</Text>

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
                          backgroundColor: 'red',
                        }}
                      />
                      {itemx === 2 && itemy == 4 ? (
                        <Image
                          style={{
                            position: 'absolute',
                            height: perbox - 4,
                            width: perbox - 4,
                            margin: 2,
                          }}
                          source={require('../../Assets/Icons/star.png')}
                        />
                      ) : null}

                      <Text>{bpos[4][itemx][itemy]}</Text>

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