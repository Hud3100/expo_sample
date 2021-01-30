import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ViewShot, {captureRef} from "react-native-view-shot";

const App = () => {
  const [imageURI, setImageURI] = useState('https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',);
  const [savedImagePath, setSavedImagePath] = useState('');

  const takeScreenShot = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
      });
      console.log(uri);
      setSavedImagePath(uri);
      setImageURI(uri);
    } catch (error) {
      console.log('error', error);
    }
    // console.log(viewRef);
    // testRef.capture().then(
    //   (uri) => {
    //     console.log("success")
    //     console.log(uri);
    //     setSavedImagePath(uri);
    //     setImageURI(uri);
    //   },
    //   (error) => console.error('Oops, Something Went Wrong', error),
    // );
  };

  const viewRef = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={{uri: imageURI}}
          style={{
            width: 200,
            height: 300,
            resizeMode: 'contain',
            marginTop: 5
          }}
        />
        <ViewShot
          style={styles.container}
          ref={viewRef}
          options={{
            format: 'jpg',
            quality: 0.8,
          }}
        >
          <Text>Test Shot</Text>
        </ViewShot>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={takeScreenShot}
        >
          <Text style={styles.buttonTextStyle}>
            Take ScreenShot
          </Text>
          <Text style={styles.textStyle}>
            {
              savedImagePath ? `Saved Image Path\n ${savedImagePath}` : ''
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
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