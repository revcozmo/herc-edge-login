// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import * as Assets from '../../assets/'
// import { LogoImageHeader } from '../abSpecific'
import { BackgroundImage } from '../common'
import { Image, Button, TouchableOpacity, StyleSheet, } from 'react-native';
import hercLogo from '../../../../../../src/assets/hercLogoBreak.png';
import styles from "../../../../../../src/assets/styles";

type Props = {
  styles: Object,
  startFlow(string): void
}

type State = {}
export default class LandingScreenComponent extends Component<Props, State> {
  render() {
    const { LandingScreenStyle } = this.props.styles;
    return (
      <View style={{ backgroundColor: "#091141" }} >
        <View style={styles.containerCenter}>
          <Image source={hercLogo} style={{ height: 100, width: 250, alignSelf: "center", marginTop: "15%", }} />
          <Text style={{ alignSelf: "center", color: "white", marginTop: "10%" }}>
            Decentralized Supply Chain Management Software
          </Text>
          <View style={{ marginTop: 30, flex: 1 }}>
            <TouchableOpacity
              onPress={this.onStartCreate.bind(this)}
              style={localStyles.createAccountButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}> CREATE ACCOUNT </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onStartLogin.bind(this)}
              style={localStyles.signInButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}> SIGN IN </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  renderOverImage() {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.inner}>
        <View style={LandingScreenStyle.featureBox}>
          {/* <LogoImageHeader style={LandingScreenStyle.logoHeader} /> */}
          <Image source={hercLogo} style={{ height: 100, width: 250, alignSelf: "center", margin: 10, }} />
          <View style={LandingScreenStyle.featureBoxContent}>
            <View style={LandingScreenStyle.featureBoxDescription}>
              <Text style={{ alignSelf: "center", color: "white" }}>
                Decentralized Supply Chain Management Software
              </Text>
            </View>
          </View>
          <View style={LandingScreenStyle.featureBoxButtons}>
            <Button
              onPress={this.onStartCreate.bind(this)}
              title={s.strings.landing_create_account_button}
              color="gold"
            // downStyle={LandingScreenStyle.createButton.downStyle}
            // downTextStyle={LandingScreenStyle.createButton.downTextStyle}
            // upStyle={LandingScreenStyle.createButton.upStyle}
            // upTextStyle={LandingScreenStyle.createButton.upTextStyle}
            />
            <View style={LandingScreenStyle.shim} />
            <Button
              testID={'alreadyHaveAccountButton'}
              onPress={this.onStartLogin.bind(this)}
              title={"Sign In"}
              color="green"
            />
          </View>
        </View>
      </View>
    )
  }
  onStartCreate() {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Create_Account`)
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }

  onStartLogin() {
    this.props.startFlow(Constants.WORKFLOW_PASSWORD)
  }
}


const localStyles = StyleSheet.create({
  createAccountButton: {
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 10,
    marginTop: "40%"
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    marginTop: "20%",
    width: 150,
  },
})