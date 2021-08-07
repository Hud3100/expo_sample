import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import PhraseInput from '../component/kokotobaInput';
import firebase from "firebase";

const recordComponent = () => {
    const user = firebase.auth().currentUser;
    const uid = 'XH1p44CXVnRL1rTIE4npy0vL9C73';
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

            await uploadRef.put(blob, metadata);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
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
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={takeScreenShot}
                >
                <Text style={styles.buttonTextStyle}>
                    Take ScreenShot
                </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

export default recordComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 24
    },
    viewShot: {
        flex: 1,
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
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        minWidth: 250,
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
    },
});