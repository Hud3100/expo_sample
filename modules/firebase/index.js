import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const initFirebaseAuth = () => {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
    });
};

export const logout = () => {
    return firebase.auth().signOut();
}

export const getNowDate = () => {
    return firebase.firestore.FieldValue.serverTimestamp()
}