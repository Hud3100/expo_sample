import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import PhraseInput from '../component/kokotobaInput';
import firebase from "firebase";
import { initFirebaseAuth, getNowDate } from '../modules/firebase/index'
import { Actions } from 'react-native-router-flux';

const recordComponent = () => {
    const viewRef = useRef();
    const storageRef = firebase.storage();
    const metadata = {
        contentType: 'image/jpeg',
    };
    const [description, setDescription] = useState('');

    const takeScreenShot = async () => {
        try {
            const capturedImageUri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 0.8,
                result: "tmpfile"
            });
            const user = await initFirebaseAuth();
            const uid = user.uid;
            const postIndex = Date.now().toString();
            const response = await fetch(capturedImageUri);
            const blob = await response.blob();
            const uploadRef = storageRef.ref().child('images/' + uid + '/' + postIndex);

            uploadRef.put(blob, metadata).then(function(url) {
                uploadRef.getDownloadURL().then(function(url) {
                    createFeed(description, url, uid);
                }).catch(function(error) {
                    console.log(error);
                })
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const createFeed = (description, url, uid) => {
        const feedCollection = firebase.firestore().collection('feed');
        feedCollection.add({
            authorRef: firebase.firestore().collection('users').doc(uid),
            image_url: url,
            description: description,
            created_at: getNowDate(),
            updated_at: getNowDate()
        })
        .then((res) => {
            Actions.kotobaDetail({ kotobaId: res.id });
        })
        .catch((error) => {
            console.log('投稿失敗しました' + error);
        });
    }

    return (
                <View style={styles.container}>
                    <ViewShot
                        style={styles.viewShot}
                        ref={viewRef}
                        options={{
                            format: 'jpg',
                            quality: 0.8,
                        }}
                    >
                        <PhraseInput />
                    </ViewShot>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    {/* <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{flex: 1}}
                    > */}
                        <TextInput
                            style={styles.commentInput}
                            defaultValue={"説明"}
                            multiline={true}
                            onChangeText = { (description) => {setDescription(description)}}
                        />
                    {/* </KeyboardAvoidingView> */}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={takeScreenShot}
                        >
                        <Text style={styles.buttonTextStyle}>
                            ことばを残す
                        </Text>
                    </TouchableOpacity>
                </View>
    )
};

export default recordComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 48,
    },
    viewShot: {
        flex: 3,
        alignItems: 'stretch'
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        textAlign: 'center',
        padding: 10,
    },
    commentInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flex: 1,
        padding: 16,
        fontSize: 20,
        fontFamily: 'NotoSansJP_500Medium',
    },
    buttonStyle: {
        color: 'white',
        backgroundColor: 'green',
        padding: 12,
        minWidth: 250,
    },
    buttonTextStyle: {
        fontSize: 20,
        padding: 5,
        color: 'white',
        textAlign: 'center',
    },
});