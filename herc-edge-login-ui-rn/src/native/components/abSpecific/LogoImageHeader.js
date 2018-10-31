// @flow

import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import hercLogo from './hercLogoBreak.png'

import * as Assets from '../../assets/'

type Props = {
  small?: boolean,
  style: Object
}

class LogoImageHeader extends Component<Props> {
  render () {
    let src = Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <View style={this.props.style.container}>
        <Image source={hercLogo} style={localStyles.logo} />
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "50%"
  }
})

export { LogoImageHeader }
