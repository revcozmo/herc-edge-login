import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import React from "react";
import styles from "../assets/styles";
import supplyChain from "../assets/supplyChain.png";
import { Button } from "react-native-button";

export class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={localStyles.headerBox}><Text style={localStyles.headerText}>Settings</Text></View>,
  });



  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>
          <Text style={localStyles.text}> Setting 1 </Text>
          <Text style={localStyles.text}> Setting 2 </Text>
          <Text style={localStyles.text}> Setting 3 </Text>
          <Text style={localStyles.text}> Setting 4 </Text>
          <View style={{ flexDirection: 'column', alignItems: 'center', height: 200, width: 500, alignContent: 'space-between', justifyContent: 'space-around' }}>
            <View style={{ height: 30, width: 100, backgroundColor: "yellow", borderRadius: 5, }}>
              <Text style={localStyles.buttonText}>Setting 5</Text>
            </View>
            <View style={{ height: 30, width: 100, backgroundColor: "green", borderRadius: 5, }}>
              <Text style={localStyles.buttonText}>Setting 6</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  headerBox: {
    alignItems: "center",
    flex: 1
  },
  headerText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "bold"
  },
  text: {
    color: "white",
    textAlign: "left",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
  buttonText: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
})
export default Settings;