import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, InputAccessoryView, Button, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const PhraseInput = () => {

    const inputAccessoryViewID = 'kotobaInputID'
    const [textValue, setTextValue] = useState('ことばを残そう');

    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setTextValue(text)}
                defaultValue={"こんにちは"}
                value={textValue}
                multiline={true}
                inputAccessoryViewID={inputAccessoryViewID}
            />
            <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.keyboardIcon} >
                <Icon
                    name="check"
                    size={32}
                    color="#009944"
                    onPress={Keyboard.dismiss}/>
            </View>
            </InputAccessoryView>
        </View>
    );
}

export default PhraseInput;


import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 50,
    },
    keyboardIcon: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent:'center',
        paddingRight: 16,
        paddingBottom: 8,
    }
})