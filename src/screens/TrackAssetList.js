import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import track from '../components/buttons/blockScannerBtn.png';
import { connect } from 'react-redux';
import styles from '../assets/styles';
import { selectAsset } from '../actions/AssetActions';
import { fetchBlock } from '../actions/EthActions';
import logo from "../assets/round.png";

class TrackAssetList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let headerStyles = StyleSheet.create({
      header__container: {
        display: "flex",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20
      },
      header__container__centeredBox: {
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
      },
      header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,
      },
      header__image__box: {
        height: "100%",
        borderRadius: 100
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
      },
    })
    return {
      headerTitle: (
        <View style={headerStyles.header__container}>
        <View style={headerStyles.header__container__centeredBox}>
          <View style={headerStyles.header__image__box}>
            {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
         </TouchableHighlight> */}
            <Image
              style={headerStyles.assetHeaderLogo}
              source={logo}
            />
          </View>
          <View style={headerStyles.header__text__box}>
            <Text style={headerStyles.headerText}>Track</Text>
          </View>
        </View>
      </View>
      )
    }
  }
  _onPress = (asset) => {
    const { navigate } = this.props.navigation;
    console.log("TrackAssetList: going to the trans")
    this.props.selectAsset(asset);
    navigate('TrackAssetOptions', { name: asset.Name, logo: asset.Logo });
  }



  render() {
    let list = this.props.assets.map((asset, index) => {
      return (
        <TouchableHighlight key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            {/* <Button onPress={() => this._onDelete(asset.key)} style={styles.assetDeleteButton}>Delete</Button> */}
            <Image style={localStyles.assetLogo} source={{ uri: asset.Logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.Name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 15 }]}>
          <ScrollView>

          {list}

          </ScrollView>
        </View>
      </View>


    )
  };
}

//need to write GET_TRANS

const mapStateToProps = (state) => ({
  assets: state.AssetReducers.assets,

});

const mapDispatchToProps = (dispatch) => ({
  fetchBlock: () => dispatch(getBlock()),
  selectAsset: (asset) => dispatch(selectAsset(asset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackAssetList)

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
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  createButton: {
    width: 150,
    height: 50,
    borderColor: "#f3c736",
    borderWidth: 1,
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 15,
    paddingLeft: 3,
  },
  assetLogo: {
    height: 25,
    width: 25,
    marginLeft: 2,
    borderRadius: 25 / 2,
    alignSelf: "center"
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    margin: 2,
    fontFamily: "dinPro"
  },
  menuItemField__textBox: {
    flex: 1
  },
})
