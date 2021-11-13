import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, InputAccessoryView, Keyboard } from 'react-native';
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

const styles = StyleSheet.create({
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        padding: 16,
        fontSize: 40,
        fontFamily: 'NotoSansJP_500Medium',
    },
    keyboardIcon: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent:'center',
        paddingRight: 16,
        paddingBottom: 8,
    }
})