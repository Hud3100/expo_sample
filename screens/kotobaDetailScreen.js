import React from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { useEffect } from 'react/cjs/react.development';

const kotobaDetail = (props) => {
    const kotobaId = props.kotobaId;
    useEffect((kotobaId) => {
        // ユーザー情報を取得
        
        // ことば情報を取得
        console.log(kotobaId);
    }, []);

    return (
        <View style={styles.detailWrapper}>
            <Text>{props.kotobaId}</Text>
            <Image
                style={styles.image}
                source={{
                    uri: props.imageURL
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    detailWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    image: {
        flex: 1,
        width: '100%',
    }
});

export default kotobaDetail;