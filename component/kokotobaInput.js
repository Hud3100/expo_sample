import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PhraseInput = () => {
    const [textValue, setTextValue] = useState('ことばを残そう');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setTextValue(text)}
                value={textValue}
            />
        </View>
    );
}

export default PhraseInput;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        height: 40,
        borderColor: '#000'
    }
})