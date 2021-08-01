import firebase from 'firebase';
const db = firebase.firestore();

export const diceRoll = () => {
  const random = Math.ceil(Math.random() * 100);
  if (random > 80) return 6;
  else if (random < 20) return 1;
  else return Math.ceil(Math.random() * 5);
};

export const nextGo = (dice, pos, setpos, now, wants, color, gameid) => {
  wants %= 52;
  now %= 52;
  let temppos = pos;
  temppos[now] = null;
  temppos[wants] = color;
  setpos([...temppos]);
};

export const done = async (gameid, color) => {
  await db
    .collection('Games')
    .doc(gameid)
    .update({
      chal:
        color === 'red'
          ? 'green'
          : color === 'green'
            ? 'purple'
            : color === 'purple'
              ? 'blue'
              : 'red',
    });
};

export const nextgg = (now, pos, color) => {
  if (color === 'green') {
    if (now < 12 && now + pos >= 12) {
      let x = 11 - now;
      pos -= x;
      return 58 + pos - 1;
    }
    if (now >= 58) return pos + now;
    return (now + pos) % 52;
  }

  if (color === 'red') {
    if (now < 51 && now + pos >= 51) {
      let x = 50 - now;

      pos -= x;

      return 52 + pos - 1;
    }
    if (now >= 52) return pos + now;

    return (now + pos) % 52;
  }

  if (color === 'purple') {
    if (now < 25 && now + pos >= 25) {
      let x = 24 - now;

      pos -= x;

      return 64 + pos - 1;
    }
    if (now >= 64) return pos + now;

    return (now + pos) % 52;
  }

  if (color === 'blue') {
    if (now < 38 && now + pos >= 38) {
      let x = 37 - now;

      pos -= x;

      return 70 + pos - 1;
    }
    if (now >= 70) return pos + now;

    return (now + pos) % 52;
  }
};

export const available = (position, color, pos, colors, dice, gamedata) => {
  let found = false;

  // console.log(found)
  //   if (!found) return false;
  if (color === 'red' && nextgg(position, dice, color) > 57) return false;
  if (color === 'green' && nextgg(position, dice, color) > 63) return false;
  if (color === 'purple' && nextgg(position, dice, color) > 69) return false;
  if (color === 'blue' && nextgg(position, dice, color) > 75) return false;
  for (let i = 0; i < colors[position].length; i++) {
    if (colors[position][i] === color) {
      return true;
    }
  }
  // console.log(found)
  if (!found) return false;

  return false;
};

export const changeDone = (color, gamedata, setdicedisable, gameid) => {
  console.log(color);
  if (color === 'red' && gamedata.RedBox === 4) {
    done(gameid, color);
    setdicedisable(false);
    return true;
  }
  if (color === 'green' && gamedata.GreenBox === 4) {
    done(gameid, color);
    setdicedisable(false);
    return true;
  }
  if (color === 'blue' && gamedata.BlueBox === 4) {
    done(gameid, color);
    setdicedisable(false);
    return true;
  }
  if (color === 'purple' && gamedata.PurpleBox === 4) {
    console.log(color);
    done(gameid, color);
    setdicedisable(false);
    return true;
  }

  return false;
};

const checkStopich = pos => {
  if (
    pos === 0 ||
    pos === 9 ||
    pos === 13 ||
    pos === 22 ||
    pos === 26 ||
    pos === 35 ||
    pos === 39 ||
    pos === 48
  ) {
    return true;
  }
  return false;
};

export const myChalNow = async (
  color,
  setdicedisable,
  value,
  setvalue,
  pressed,
  colors,
  gameid,
  pos,
  gamedata,
  setchalxx,
) => {
  //available

  let temp = pos;
  console.log(pressed, value, color);

  let nx = nextgg(pressed, value, color);
  let RedBox = gamedata.RedBox;
  let GreenBox = gamedata.GreenBox;
  let PurpleBox = gamedata.PurpleBox;
  let BlueBox = gamedata.BlueBox;
  let katse = 0;
  if (!checkStopich(nx)) {
    if (color !== 'green' && temp[nx].green === 1) {
      temp[nx].green -= 1;
      GreenBox++;
      katse++;
    }
    if (color !== 'red' && temp[nx].red === 1) {
      temp[nx].red -= 1;
      RedBox++;
      katse++;
    }
    if (color !== 'blue' && temp[nx].blue === 1) {
      temp[nx].blue -= 1;
      BlueBox++;
      katse++;
    }
    if (color !== 'purple' && temp[nx].purple === 1) {
      temp[nx].purple -= 1;
      PurpleBox++;
      katse++;
    }
  }
  temp[pressed][color] -= 1;
  temp[nextgg(pressed, value, color)][color] += 1;
  await firebase
    .firestore()
    .collection('Games')
    .doc(gameid)
    .update({
      pos: temp,
      BlueBox,
      GreenBox,
      PurpleBox,
      RedBox,
    })
    .then(res => { })
    .catch(err => {
      console.log(err);
    });
  if (value !== 6 && katse === 0) {
    await done(gameid, color);
    await firebase.firestore().collection('Games').doc(gameid).update({
      sixcount: 0,
    });
  }
  setdicedisable(false);
  setchalxx(false);
};

export const newFromBox = async (
  setdicedisable,
  pos,
  gameid,
  gamedata,
  color,
  value,
) => {
  if (value !== 6) return;
  let gamdd = gamedata;
  let tpos = pos;
  if (color === 'red' && gamedata.RedBox === 0) return;
  else if (color === 'red') {
    gamdd.RedBox -= 1;
    tpos[0].red += 1;
  }
  if (color === 'blue' && gamedata.BlueBox === 0) return;
  else if (color === 'blue') {
    gamdd.BlueBox -= 1;
    tpos[39].blue += 1;
  }

  if (color === 'purple' && gamedata.PurpleBox === 0) return;
  else if (color === 'purple') {
    gamdd.PurpleBox -= 1;
    tpos[26].purple += 1;
  }

  if (color === 'green' && gamedata.GreenBox === 0) return;
  else if (color === 'green') {
    gamdd.GreenBox -= 1;
    tpos[13].green += 1;
  }

  gamdd.pos = tpos;

  firebase
    .firestore()
    .collection('Games')
    .doc(gameid)
    .set(gamdd)
    .then(res => {
      setdicedisable(false);
    });
};
