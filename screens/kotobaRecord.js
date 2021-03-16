import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import PhraseInput from '../component/kokotobaInput';
import firebase from "firebase";

const recordComponent = () => {
  const [imageURI, setImageURI] = useState('https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',);
  const [savedImagePath, setSavedImagePath] = useState('');
  const db = firebase.firestore();

  // スクリーンショットと写真をポストする関数を分割する。

  const takeScreenShot = async () => {
    try {
      const imgUri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
        result: "tmpfile"
      });
      setSavedImagePath(imgUri);
      setImageURI(imgUri);

      // Firebaseアプリのstorage()サービスから、Google Cloud Strorageへの
      // 参照を作成する

      let storageRef = firebase.storage();


      const metadata = {
        contentType: 'image/jpeg',
      };
      const postIndex = Date.now().toString();
      const imgURI = imageURI;

      // fetch()の引数にリソースへのパスを設定し、
      // レスポンスオブジェクトを含むpromiseを取得。
      const response = await fetch(imgURI);
      // Responseストリームを取得し、完全に読み込む。これは、Blobで
      // 解決するpromiseを返す。
      const blob = await response.blob();
      const uploadRef = storageRef.ref('images').child(`${postIndex}`);

      await uploadRef.put(blob, metadata).catch(() => {
        alert('画像の保存に失敗しました');
      });

      // storageRef.child(`sample`).put(file).then(function(snapshot) {
      //   console.log('Hello');
      // });
      // storageRef.put(blob, 'image/jpeg').catch(() =>{ alert('画像の保存に失敗しました'); });

    } catch (error) {
      console.log('error', error);
    }
  };

  const viewRef = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Image
            source={{uri: imageURI}}
            style={{
              width: 200,
              height: 300,
              resizeMode: 'contain',
              marginTop: 5
            }}
          /> */}
          <ViewShot
            style={styles.viewShot}
            ref={viewRef}
            options={{
              format: 'jpg',
              quality: 0.8,
            }}
          >
            <PhraseInput />
          </ViewShot>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={takeScreenShot}
          >
            <Text style={styles.buttonTextStyle}>
              Take ScreenShot
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};

export default recordComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewShot: {
    flex: 1,
    alignItems: 'stretch'
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});