import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import PhraseInput from '../component/kokotobaInput';
import firebase from "firebase";
import { Actions } from "react-native-router-flux";

const recordComponent = () => {
    const user = firebase.auth().currentUser;
    const uid = 'c4N6GIpxmNbmN1NN3Yr6DDrFKPI3';
    const viewRef = useRef();
    const storageRef = firebase.storage();
    const metadata = {
        contentType: 'image/jpeg',
    };

    const takeScreenShot = async () => {
        try {
            const capturedImageUri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 0.8,
                result: "tmpfile"
            });

            const postIndex = Date.now().toString();
            const response = await fetch(capturedImageUri);
            const blob = await response.blob();
            const uploadRef = storageRef.ref().child('images/' + uid + '/' + postIndex);

            // getDownloadUrl
            let test = await uploadRef.put(blob, metadata);
        } catch (error) {
            console.log('error', error);
        }
    };

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
                <TextInput
                    style={styles.commentInput}
                    defaultValue={"コメント"}
                    multiline={true}
                />
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