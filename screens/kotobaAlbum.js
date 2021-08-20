import React, { useEffect, useState } from 'react';
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import firebase from "firebase";
import fetchUserPhotos from '../src/services/fetchUserPhotos';
import { Actions } from 'react-native-router-flux';

const kotobaAlbum = () => {
    const user = firebase.auth().currentUser;
    const [imagesURLList, setImagesURLList] = useState([]);

    useEffect(() => {
        fetchUserPhotos(user).then(result => {
            setImagesURLList(result);
        });
    }, [imagesURLList]);

    const images = imagesURLList.map((url) =>
        <TouchableHighlight
            style={styles.imageWrapper}
            onPress={() => { Actions.kotobaDetail({imageURL: url}) }}
        >
            <Image
                style={styles.image}
                source={{
                    uri: `${url}`,
                }}
            />
        </TouchableHighlight>
    );

    const test = async (user) => {
        let result = await fetchUserPhotos(user);
        setImagesURLList(result);
        console.log(imagesURLList);
    }

    return (
        <>
            <Text>画像一覧</Text>
            <Button
                title="更新ボタン"
                onPress={() => test(user)}
            />
            <ScrollView>
                <View style={styles.imagesContainer}>
                    {images}
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        width: '33%',
        height: 150,
        resizeMode: 'stretch',
        borderWidth: 1,
        borderColor: "red"
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch',
    }
});

export default kotobaAlbum;