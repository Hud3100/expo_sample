import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const loginScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ログイン画面です。</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        textAlign: 'center'
    },
})

export default loginScreen;