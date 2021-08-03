import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Image,
    Text,
    StyleSheet,
    SafeAreaView,
    Button,
    View
} from 'react-native';
import firebase from "firebase";
import fetchUserPhotos from '../src/services/fetchUserPhotos';

const kotobaAlbum = () => {
    const user = firebase.auth().currentUser;
    const [imagesURLList, setImagesURLList] = useState([]);

    useEffect(() => {
        fetchUserPhotos(user).then(result => {
            setImagesURLList(result);
        });
    }, [imagesURLList]);

    const images = imagesURLList.map((url) =>
        <Image
            style={styles.image}
            source={{
                uri: `${url}`,
            }}
        />
    );

    const test = async (user) => {
        let result = await fetchUserPhotos(user);
        setImagesURLList(result);
        console.log(imagesURLList);
    }

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagesContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: '33%',
        height: 150,
        resizeMode: 'stretch',
    }
});

export default kotobaAlbum;