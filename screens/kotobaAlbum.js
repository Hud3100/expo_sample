import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import firebase from "firebase";

const kotobaAlbum = () => {

    const storageRef = firebase.storage();
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    // 画像の取得ここから
    const [showImageUri, setShowImageUri] = useState('https://reactnative.dev/img/tiny_logo.png');

    // const userImagesRef = storageRef.ref().child('images/' + uid + '/1619976809623');
    const userImagesRef = storageRef.ref().child('images/' + uid);
    userImagesRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef){
            itemRef.getDownloadURL().then(function(url){
                console.log(url);
            });
        });
    })


    return (
        <SafeAreaView style={styles.container}>
            <Text>{showImageUri}</Text>
            <Image
                style={styles.imageGallary}
                source={{
                    uri: `${showImageUri}`,
                }}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageGallary: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
    }
});

export default kotobaAlbum;