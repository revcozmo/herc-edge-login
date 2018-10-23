import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import styles from '../assets/styles';
// import leaderBrd from '../assets/leaderBrdBtn.png';
import info from "../components/buttons/infoBtn.png";
import begin from "../components/buttons/beginBtn.png";
import hiprLogo from "../assets/hiprLogo.png";
import hiprText from "../assets/hiprText";

export default class PreHIPR extends Component {

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
                source={hiprLogo}
              />
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Validate</Text>
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

          <TouchableHighlight onPress={() => navigate('HiprAssets')}>
            <Image source={begin} style={localStyles.menuButton} />
          </TouchableHighlight>
          {this.state.info &&
          <View style={localStyles.copyContainer}>
              <Text style={localStyles.copy}>{[hiprText]}</Text>
            </View>
          }
        </View>
      </View>


    )
  };
}


const localStyles = StyleSheet.create({

  headerField: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  hercLogoHeader: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3,
  },
  registerHeaderText: {
    fontFamily: "dinPro",
    height: 50,
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "normal",
    color: "black",
    textAlign: "center"
  },

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
    // height: 200,
    width: '90%',
    // backgroundColor: "blue"
  },
  copy: {
    fontSize: 18,
    color: "yellow",
    textAlign: "center"
  }

})
