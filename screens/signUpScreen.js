import React, { useState } from 'react';
import { View, Text, TouchableHighlight,
        TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import 'firebase/firestore';

const signUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [childName, setChildName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const onButtonPress = () => {
        setLoading(true);
        createUser(email, password);
    }

    // ユーザー作成処理
    const createUser = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(result) {
                const userCollection = firebase.firestore().collection('users');

                userCollection.doc(result.user.uid).set({
                    name: name,
                    childName: childName,
                })
                .then(() => {
                    console.log('ユーザーデータが正常に保存されました');
                })
                .catch((error) => {
                    console.log('ユーザーデータ作成時にエラーが発生しました' + error);
                });
            })
            .then(signUpSuccess())
            .catch( (error) => {onSignUpFail(error)} );
    }

    const signUpSuccess = () => {
        setEmail('');
        setPassword('');
        setName('');
        setChildName('');
        setLoading(false);
        setError('');
    }

    const onSignUpFail = (error) => {
        setLoading(false);

        switch (error.code) {
            case 'auth/invalid-email':
                setError('メールアドレスが正しくありません');
                break;

            case 'auth/weak-password':
                setError('6文字以上のパスワードを設定してください');
                break;

            case 'auth/email-already-in-use':
                setError('メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください');
                break;

            default:
                setError('アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。');
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>ココトバに登録しよう</Text>
            <View>
                <Text>{error}</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={ (text) => {setName(text)}}
                    placeholder='あなたのお名前（ニックネーム）'
                />
                <TextInput
                    style={styles.input}
                    value={childName}
                    onChangeText={ (text) => {setChildName(text)}}
                    placeholder='こどもの名前'
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={ (text) => {setEmail(text);} }
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="メールアドレス"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={ (text) => {setPassword(text);} }
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="パスワード"
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.button} onPress={ () => onButtonPress()} underlayColor="#C70F66">
                    <Text style={styles.buttonTitle}>利用登録</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={ () => { Actions.pop(); }} underlayColor="#C70F66">
                    <Text style={styles.buttonTitle}>ログインはこちらから</Text>
                </TouchableHighlight>
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
    textInputContainer: {
        marginTop: 16,
        width: '80%',
    },
    input: {
        borderBottomWidth : 1,
        borderColor : '#c1c1c1',
        borderRadius : 3,
        height : 40,
        marginTop: 16,
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 24,
    },
    button: {
        marginTop: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FF6699',
        borderRadius: 16
    },
    buttonTitle: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#fff'
    },
})

export default signUpScreen;