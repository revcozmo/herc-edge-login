import React, {Component} from 'react';
import { StyleSheet, Button, Text, TextInput, ScrollView, ActivityIndicator, Modal, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';

export default class HiprTransactions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _onPress(transaction){
    const { navigate } = this.props.navigation;
    navigate('Hipr', { transaction: transaction });
  }

  render(){
    let assets = this.props.navigation.getParam('asset') // TODO: add error handling for empty param
    let transactions = assets.transactions

    let list = Object.keys(transactions).map((transaction, index) => {
      return (
        <TouchableHighlight style={{ borderRadius: 2 }} key={index} onPress={() => this._onPress(transactions[transaction])}>
          <View style={localStyles.menuItemField}>
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{transactions[transaction].header.dTime}</Text>
              <Text style={localStyles.assetLabel}>{transactions[transaction].header.tXLocation}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return(
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {list}
          </ScrollView>
        </View>
      </View>

    )
  };
}

const localStyles = StyleSheet.create({
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
    paddingLeft: 3,
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
    flex: 1,
  },
});
