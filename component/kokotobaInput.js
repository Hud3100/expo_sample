import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PhraseInput = () => {
    const [textValue, setTextValue] = useState('ことばを残そう');
    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setTextValue(text)}
                defaultValue={"こんにちは"}
                value={textValue}
                multiline={true}
            />
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
    }
})