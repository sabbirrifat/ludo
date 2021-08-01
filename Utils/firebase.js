import firebase from "firebase";
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provier = new firebase.auth.GoogleAuthProvider();

provier.setCustomParameters({propmt: 'select_account'});
export const Signinwithgoogle = () => auth.signInWithPopup(provier);

export const adduser = async userauth => {
  if (userauth === null) {
    return;
  } else {
    const {uid, displayName, email} = userauth;
    const created_at = new Date();

    const event = firestore.doc('users/' + uid);
    const event2 = await event.get();
    if (!event2.exists) {
      try {
        await event.set({
          uid,
          displayName,
          email,
          created_at,
        });
      } catch (error) {
        console.error('some thing is wrong ', error.message);
      }
    }
  }
};
