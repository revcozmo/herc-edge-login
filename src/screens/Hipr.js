import React, { Component } from 'react';
import { Platform, WebView, Image } from 'react-native';
// import { STATUS_BAR_HEIGHT } from '../constants';
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
        source={{ uri: 'http://hipr.one/' }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    );
  }
}
