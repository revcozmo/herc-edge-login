import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import hiprLogo from "../assets/hiprLogo.png";
import backArrow from "../assets/icons/blueBackArrow.png";
import profilePic from "../assets/icons/darker_profileIcon.png";


////// TODO: Status bar height needs to be sorted
export default class Hipr extends Component {

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
      <TouchableHighlight onPress={() => navigation.goBack()}>
        <Image style={localStyles.backArrow} source={backArrow} />
      </TouchableHighlight>,
    headerRight: <Image source={profilePic} style={{ height: 40, width: 25, resizeMode: 'contain', marginRight: 10 }} />

  })
  render() {
    return (
      <WebView
        source={{ uri: 'https://hipr.one/index.html' }}
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
