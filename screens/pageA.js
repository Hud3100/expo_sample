import React, { Component } from 'react';
import { View, Text } from 'react-native';

class pageA extends Component {
  render() {
    return (
      <View style={pageStyle}>
        <Text style={fontStyle}>A</Text>
      </View>
    )
  }
}

const pageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
  paddingTop: 100
}
const fontStyle = {
  fontSize: 36,
  fontWeight: '600'
}

export default pageA;