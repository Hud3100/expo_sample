import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import firebase from "firebase";

class kotobaAlbum extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>アルバムだよ</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default kotobaAlbum;