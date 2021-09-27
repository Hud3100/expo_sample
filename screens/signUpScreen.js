import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableHighlight, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import Input from '../component/input';
import { NotoSansJP_400Regular } from '@expo-google-fonts/noto-sans-jp';

const signUpScreen = () => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [childName, setChildName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { handleSubmit, control, formState: { errors }, getValues } = useForm({mode: 'onBlur'});

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
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView>
                    <Text style={styles.title}>ココトバに登録しよう</Text>
                    <View style={styles.error}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: '名前を入力してください'
                                }
                            }}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    placeholder='あなたのお名前（ニックネーム）'
                                    error={errors?.name}
                                    errorText={errors?.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'メールアドレスを入力してください'
                                },
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: '有効なメールアドレスを入力してください'
                                }
                            }}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    placeholder='あなたのメールアドレス'
                                    error={errors?.email}
                                    errorText={errors?.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'パスワードを入力してください',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'パスワードは6文字以上で入力してください',
                                }
                            }}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input
                                    onChangeText={(value) => onChange(value)}
                                    value={"T"}
                                    onBlur={onBlur}
                                    placeholder='パスワード'
                                    error={errors?.password}
                                    errorText={errors?.password?.message}
                                />
                            )}
                        />
                        <Controller
                            name="passwordConfirm"
                            control={control}
                            defaultValue=""
                            rules={{
                                validate: {
                                    matchesPreviousPassword: value => value === getValues(password) || "パスワードが一致しません"
                                },
                                required: {
                                    value: true,
                                    message: '確認用のパスワードを入力してください'
                                },
                            }}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    placeholder='パスワード確認用'
                                    error={errors?.passwordConfirm}
                                    errorText={errors?.passwordConfirm?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.button} onPress={ () => onButtonPress()} underlayColor="#C70F66">
                            <Text style={styles.buttonTitle}>登録</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={ () => { Actions.pop(); }} underlayColor="#C70F66">
                            <Text style={styles.buttonTitle}>ログインはこちらから</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    container: {
        flex: 1,
        width: '90%',
        overflow: 'visible'
    },
    title: {
        fontSize: 24,
    },
    error: {
        marginTop: 24,
    },
    errorText: {
        fontSize: 16,
        color: '#da3c41',
    },
    input: {
        borderBottomWidth : 1,
        borderColor : '#c1c1c1',
        borderRadius : 3,
        height : 40,
        marginTop: 24,
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
        backgroundColor: '#FFAAD2',
        borderRadius: 32,
    },
    buttonTitle: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
})

export default signUpScreen;