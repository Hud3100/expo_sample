import React, { useState } from 'react';
import {
    View, Text, Button, TouchableOpacity, TouchableHighlight,
    TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView, KeyboardAvoidingViewBase
} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const signInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onButtonPress = () => {
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( () => {onLoginSuccess();} )
            .catch( (authError) => {onLoginFail(authError); });
    }

    const onLoginSuccess = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
        setError('');
        console.log("Login Success");
    }

    const onLoginFail = (authError) => {
        setLoading(false);
        setError(authError);
        console.log(error);
    }

    const loadSpinner = () => {
        if (loading) {
            return <ActivityIndicator size="small" />
        }

        return (
            <>
                <TouchableHighlight
                    style={styles.button}
                    onPress={ () => onButtonPress()} underlayColor="#C70F66"
                >
                    <Text style={styles.buttonTitle}>ログインする！</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={ () => { Actions.signUp(); }}
                    underlayColor="#C70F66"
                >
                    <Text style={styles.buttonTitle}>利用登録する！</Text>
                </TouchableHighlight>
            </>
        );
    }

    const errorMessage = () => {
        if (error) {
            return (
                <>
                    <Text>{typeof error}</Text>
                </>
            );
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
            <Text style={styles.title}>ココトバにログイン</Text>
            <View>
                {errorMessage()}
            </View>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={ (email_input) => {setEmail(email_input);} }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={ (password_input) => {setPassword(password_input);} }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry
            />
            <View>
                {loadSpinner()}
            </View>
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

export default signInScreen;