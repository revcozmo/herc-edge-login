import React, { Component } from '../../../../../.cache/typescript/2.9/node_modules/@types/react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from '../../../../../.cache/typescript/2.9/node_modules/@types/react-navigation';
import { STATUS_BAR_HEIGHT } from '../constants';
import { connect } from '../../../../../.cache/typescript/2.9/node_modules/@types/react-redux';
import styles from '../assets/styles';


class PreDigi extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   // headerTitle: <Image source={supply} style={{ height: 50, width: 250, marginLeft: 20 }} />,
  // })
  
  _onPress = (asset) => {
    const { navigate } = this.props.navigation;
    
    navigate("Digi", { logo: asset.logo, name: asset.name });
  }
  render() {
    const { navigate } = this.props.navigation;
    // console.log(this.props);
    let list = this.props.assets.map((asset, index) => {
      // console.log(asset);
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
      // conditional render or fix scrollview styling...
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>
          {/* <Image source={supply} style={{height: 50, width: 250, margin: 5}} />  */}
          <ScrollView contentContainerStyle={styles.scrollView}>
            {list}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  assets: state.Assets,

});

export default connect(mapStateToProps)(PreDigi);

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
    width: 240,
    height: 50,
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