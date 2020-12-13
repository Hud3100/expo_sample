import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default class App extends React.Component {

  state = {
    text1 : "placeholder"
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>入力してください</Text>
        <TextInput
          onChangeText = {(t) => this.setState({text1:t})}
        />
        <Button
          title="Entry"
          onPress={this.entry}
        />
      </View>
    );
  }

  entry = () => {
    alert(this.state.text1);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});