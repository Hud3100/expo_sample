import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const getUid = () => {
    const user = firebase.auth().currentUser;

    if (user) {
        return { uid: user.uid }
    } else {
        return { uid: null }
    }
}

export const logout = () => {
    return firebase.auth().signOut();
}

export const getNowDate = () => {
    return firebase.firestore.FieldValue.serverTimestamp()
}