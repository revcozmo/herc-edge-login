import React, {Component} from 'react';
import { StyleSheet, Button, Text, TextInput, ActivityIndicator, Modal, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HiprTransactions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.navigation, 'chance HiprTransactions')
  }

  render(){

    let list = this.props.assets.map((asset, index) => {
      return (
        <TouchableHighlight style={{ borderRadius: 2 }} key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            <Image style={localStyles.assetLogo} source={{ uri: asset.Logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.Name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return(
      <View>
      </View>

    )
  };
}
