import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import hiprLogo from "../assets/hiprLogo.png";
import backArrow from "../assets/icons/blueBackArrow.png";
import profilePic from "../assets/icons/darker_profileIcon.png";


export default class WebViewComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
          // url: Object.values(this.props.url) || ["Data Loading","Please Be Patient"]
      }
  }
  componentDidMount(){
    let data = this.props.navigation.getParam('data')
  }

  render() {
    // let url = this.state.url
    return (
      <WebView
        source={{ uri: 'https://hipr.one/index.html' }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    )
  }
}
