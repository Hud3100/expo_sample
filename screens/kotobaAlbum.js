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

    const userImagesRef = storageRef.ref().child('images/' + uid + '/1619976809623');

    userImagesRef.getDownloadURL().then(function(url){
        setShowImageUri(url);
    }).catch(function(error) {
        console.log("失敗");
        console.log(error);
    })
    // ここまで

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