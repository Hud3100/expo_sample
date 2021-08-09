import React, { useState } from 'react';
import {
    View, Text, TouchableHighlight,
    TextInput, ActivityIndicator, StyleSheet, KeyboardAvoidingView
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
            .catch( (authError) => {onLoginFail(authError);} );
    }

    const onLoginSuccess = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
        setError('');
        console.log('ログインに成功しました');
    }

    const onLoginFail = (error) => {
        setLoading(false);
        switch (error.code) {
            case 'auth/invalid-email':
                setError('メールアドレスが正しくありません');
                break;

            case 'auth/wrong-password':
                setError('パスワードが無効です');
                break;

            case 'auth/user-not-found':
                setError('ユーザーが見つかりません');
                break;

            default:
                setError('アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。');
        }
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

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
            <Text style={styles.title}>ココトバにログイン</Text>
            <View>
                <Text>{error}</Text>
            </View>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={ (emailInput) => {setEmail(emailInput);} }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={ (passwordInput) => {setPassword(passwordInput);} }
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
        margin : 10,
    },
    button: {
        height: 30,
        borderWidth: 1,
        marginTop: 20,
        width: 100,
        textAlign: 'center',
        alignItems: 'center',
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