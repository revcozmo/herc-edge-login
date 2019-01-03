// @flow

import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'

import * as Assets from '../../assets/'

type Props = {
  small?: boolean,
  style: Object
}

<<<<<<< HEAD
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
=======
class LogoImageHeader extends Component<Props> {
  render () {
    let src = Assets.HERC_LOGO
    if (this.props.small) {
      src = Assets.HERC_LOGO
>>>>>>> 4b0ac0abf8fcf8cff187151d2c33f12eb0d56799
    }
    return (
      <View style={this.props.style.container}>
        <Image
          source={src}
          style={this.props.style.image}
<<<<<<< HEAD
          resizeMode= {'contain'}
=======
          resizeMode={'contain'}
>>>>>>> 4b0ac0abf8fcf8cff187151d2c33f12eb0d56799
        />
      </View>
    )
  }
}

<<<<<<< HEAD
=======
const localStyles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "50%"
  }
})

>>>>>>> 4b0ac0abf8fcf8cff187151d2c33f12eb0d56799
export { LogoImageHeader }
