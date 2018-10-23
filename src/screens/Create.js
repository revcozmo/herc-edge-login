import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, YellowBox } from 'react-native';
import logo from "../assets/round.png";
import { STATUS_BAR_HEIGHT } from '../constants';
import begin from "../components/buttons/beginBtn.png";
import info from "../components/buttons/infoBtn.png"
import styles from "../assets/styles";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);

//TODO: Header title nees centering
export default class Create extends Component {

  static navigationOptions = ({ navigation }) => {
    let headerStyles = StyleSheet.create({
      header__container: {
        // borderColor: "green",
        // borderWidth: 3,
        display: "flex",
        // resizeMode: "contain",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20

      },
      header__container__centeredBox: {
        // borderColor: "purple",
        // borderWidth: 3,
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
      },
      header__text__box: {
        // borderColor: "blue",
        // borderWidth: 3,
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,

      },
      header__image__box: {
        // borderColor: "yellow",
        // borderWidth: 3,
        height: "100%",
        borderRadius: 100
        // width: 50
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
        // resizeMode: "contain",
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "normal",
        color: "black",
        textAlign: "center",
        marginTop: 2,
        // paddingTop: 5
      },
    })
    return {
      headerTitle: (

        <View style={headerStyles.header__container}>
          <View style={headerStyles.header__container__centeredBox}>
            <View style={headerStyles.header__image__box}>

              <Image
                style={headerStyles.assetHeaderLogo}
                source={logo}
              />
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Register</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  state = {
    info: false
  }

  _toggleShow = () => {
    this.setState({
      info: !this.state.info
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state)
    return (

      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 59 }]}>

          <TouchableHighlight onPress={() => this._toggleShow()}>
            <Image source={info} style={localStyles.menuButton} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigate('Tee')}>
            <Image source={begin} style={localStyles.menuButton} />
          </TouchableHighlight>
          {this.state.info && <View style={localStyles.copyContainer}>
            <Text style={localStyles.copy}>
              Create a New Asset by defining its Name, URL, Up to 8 Metrics,
              and choosing a photo. This asset can be unique to either an
              individual part or a batch of a specific item. Be as succicint
              as possible as these asset metrics cannot be redefined later.
              </Text>
          </View>}
        </View>
      </View>


    )
  };
}


const localStyles = StyleSheet.create({

  menuButton: {
    // borderColor: "yellow",
    // borderWidth: 3,
    width: 200,
    height: 45,
    marginBottom: 25,
    resizeMode: "contain",
    borderRadius: 2,
    // backgroundColor:
    // borderWidth: 2,
    // borderColor: "black"
  },
  copyContainer: {
    // backgroundColor: "blue"
  },
  copy: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    textAlign: "center"
  }

})





