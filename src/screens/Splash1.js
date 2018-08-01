// const { navigate } = this.props.navigation;
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { STATUS_BAR_HEIGHT } from "../constants";
import { connect } from "react-redux";
import Button from "react-native-button";
import styles from "../assets/styles";
import create from "../assets/createNewAssetButton.png";
import supplyChain from "../assets/supplyChain.png";
import { selectAsset, deleteAsset } from "../actions/AssetActions";
import addIcon from "../components/buttons/addIcon.png";

class Splash1 extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image source={supplyChain} style={styles.headerLogo} />,
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content", true);
   
  }

  _onDelete = key => {
    const { navigate } = this.props.navigation;
    this.props.deleteAsset(key);
    navigate("MenuOptions");
  };

  _onPress = asset => {
    const { navigate } = this.props.navigation;
    this.props.selectAsset(asset);
    navigate("Splash2", { logo: asset.logo, name: asset.name });
    
  }

  render() {
    const { navigate } = this.props.navigation;
    let list = this.props.assets.map((asset, index) => {
      return (
        <TouchableHighlight style={{borderRadius:2}} key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            {/* <Button onPress={() => this._onDelete(asset.key)} style={styles.assetDeleteButton}>Delete</Button> */}
            <Image style={localStyles.assetLogo} source={{ uri: asset.logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            
            {list}
            
            <TouchableHighlight onPress={() => navigate("Create")}>
            
              <View style={localStyles.createNew__Box}>
                <Image style={localStyles.assetLogo} source={addIcon} />
                <Text style={localStyles.createNewText}>Create New</Text>
              </View>
            
            </TouchableHighlight>
          
          </ScrollView>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  createNew__Box: {
    flexDirection: "row",
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
    paddingLeft: 5,
    // justifyContent: "space-between"
  },
  createNewText: {
    // borderWidth: 3,
    // borderColor: "purple",
    flex: 1,
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    // marginLeft: "20%",
    fontFamily: "dinPro"
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 15,
    // marginTop: 10,
    paddingLeft: 3,
    // borderWidth: 2,
    // borderColor: "black"
  },
  assetLogo: {
    // borderColor: "green",
    // borderWidth: 3,
    height: 25,
    width: 25,
    marginLeft: 2,
    borderRadius: 25 / 2,
    alignSelf: "center"
    // resizeMode: "contain"
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    margin: 2,
    // marginLeft: "20%",
    fontFamily: "dinPro"
  },
  menuItemField__textBox: {
    // borderColor: "orange",
    // borderWidth: 3,
    flex: 1
  },
});

const mapStateToProps = state => ({
  assets: state.Assets
});

const mapDispatchToProps = dispatch => ({
  selectAsset: asset => dispatch(selectAsset(asset)),
  deleteAsset: key => dispatch(deleteAsset(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash1);


