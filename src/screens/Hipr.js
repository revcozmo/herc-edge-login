import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import hiprLogo from "../assets/hiprLogo.png";
import backArrow from "../assets/icons/blueBackArrow.png";
import profilePic from "../assets/icons/darker_profileIcon.png";


class Hipr extends Component {

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

  /*

  NOTES FOR HIPR PAYMENT MODEL

  hipr fee > 0x20B3dB2C1E7CFdE1a7f7D40dEf288Dc94F1e59d4 = 0.000032 HERC
  priority for HIPR is
  0.000032 = Low
  0.000064 = mid
  0.000096 = High
  the hiprFee is like a minerFee

  */


  render() {
    return (
      <WebView
        source={{ uri: 'https://hipr.one/index.html' }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ethereumAddress: state.WalletActReducers.ethereumAddress
});


export default connect(mapStateToProps)(Hipr);

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
