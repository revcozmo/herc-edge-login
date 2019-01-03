// @flow

import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'

import * as Assets from '../../assets/'

type Props = {
  small?: boolean,
  style: Object
}

const styles = StyleSheet.create({
  logo: {
    position: 'relative'
    // resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'red'
  }
});

class LogoImageHeader extends Component<Props> {
  render () {
    let src = Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <View style={this.props.style.container}>
        <Image
          source={src}
          style={this.props.style.image}
          resizeMode= {'contain'}
        />
      </View>
    )
  }
}
export { LogoImageHeader }
