import { reduce } from 'lodash';
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function Input(props) {
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={[styles.input, props.error && t.borderRed500]}
                {...props}
            />
            {props.errorText && (
                <Text style={styles.errorText}>{props.errorText}</Text>
            )}
        </View>
    );
}

const styles = {
    inputContainer: {
        marginTop: 16,
    },
    input: {
        borderBottomWidth : 1,
        borderColor : '#c1c1c1',
        borderRadius : 3,
        height : 40,
        marginTop: 24,
        fontSize: 20,
    },
    errorText: {
        marginTop: 8,
        color: '#da3c41',
    }
};