import React, { Component } from '../../../../../.cache/typescript/2.9/node_modules/@types/react';
import { Platform, WebView, Image } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';
import hiprLogo from "../assets/hiprLogo.png";

export default class Hipr extends Component {
 
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
        height: Platform.OS === 'android' ? 80 + STATUS_BAR_HEIGHT : 105,
        backgroundColor: '#021227',

    },
    headerTitle: <Image style={{
        height: 200,
        width: 200,
        marginLeft: 22,
        resizeMode: 'contain'
    }}
        source={hiprLogo} />,
    

})
  render() {
    return (
      <WebView
        source={{uri: 'http://hipr.one/'}}
        style={{margin: 0, padding: 0, flex: 1, width: '100%'}}
      />
    );
  }
}
