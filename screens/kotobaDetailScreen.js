import React from 'react';
import { View, Image, Text, StyleSheet } from "react-native";

const kotobaDetail = (props) => {
    return (
        <View style={styles.detailWrapper}>
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