import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, View, TouchableHighlight } from 'react-native';

import hiprLogo from "../assets/hiprLogo.png";
import backArrow from "../assets/icons/blueBackArrow.png";
import profilePic from "../assets/icons/darker_profileIcon.png";


export default class Factom extends Component {
  componentDidMount(){
    console.log("chance is in factom")
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: Platform.OS === 'android' ? 80 + 23 : 105,
      backgroundColor: '#091141',

    },
    headerTitle: <Image style={{
      height: 150,
      width: 150,
      marginLeft: '22%',
      resizeMode: 'contain',
      alignSelf: 'center'
    }}
      source={hiprLogo} />,
    headerLeft:
      <TouchableHighlight onPress={() => navigate('MenuOptions')}>
        <Image style={localStyles.backArrow} source={backArrow} />
      </TouchableHighlight>,
    headerRight: <Image source={profilePic} style={{ height: 40, width: 25, resizeMode: 'contain', marginRight: 10 }} />

  })
  render() {
    return (
      <WebView
        source={{ uri: 'https://explorer.factom.com/chains/4aa66fb0a816657dc8829cc41be5659de7cb94cdcb8318630bab8547f4c5e81a/entries/f4d3bc3d0f324f869948f116afe2b0a25fb042e9708714680d76705b28751b9d' }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    );
  }
}

const localStyles = StyleSheet.create({
  hiprBackContainer: {
    width: 75,
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 5,
    flexDirection: 'row'
  },

  backArrow: {
    width: 25,
    height: 20
  },
  pillar: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  }
})
