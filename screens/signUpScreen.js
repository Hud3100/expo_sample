import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TouchableHighlight,
        TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView, KeyboardAvoidingViewBase } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const signUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const onButtonPress = () => {
        setLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(LoginSuccess())
            .catch( (error) => {console.log(error.toString());} );
    }

    const LoginSuccess = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
        setError('');
    }

    const LoginFail = () => {
        setLoading(false);
        setError('Authentication Failed');
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>ココトバに登録</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={ (text) => {setEmail(text);} }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={ (text) => {setPassword(text);} }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableHighlight style={styles.button} onPress={ () => onButtonPress()} underlayColor="#C70F66">
                <Text style={styles.buttonTitle}>利用登録</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={ () => { Actions.pop(); }} underlayColor="#C70F66">
                <Text style={styles.buttonTitle}>ココトバにログイン</Text>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
    },
    input: {
        borderBottomWidth : 1,
        borderColor : '#c1c1c1',
        borderRadius : 3,
        width : '80%',
        height : 35,
        // padding : 10,
        margin : 10,
    },
    button: {
        height: 30,
        borderWidth: 1,
        marginTop: 20,
        width: 100,
        textAlign: 'center',
        alignItems: 'center',
        // flex: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    },
    buttonTitle: {
        textAlign: 'center',
        alignItems: 'center',

    }
})

export default signUpScreen;