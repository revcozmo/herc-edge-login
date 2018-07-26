import React, { Component } from 'react';
import { LoginScreen } from 'edge-login-ui-rn';
import { makeEdgeContext } from 'edge-core-js';
import { ethereumCurrencyPluginFactory } from 'edge-currency-ethereum';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      account: null,
      walletId: null,
      wallet: null
    }
  makeEdgeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: '0b5776a91bf409ac10a3fe5f3944bf50417209a0',
    appId: 'com.mydomain.myapp',
    vendorName: 'Chain Net',
    vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png',
    plugins: [ethereumCurrencyPluginFactory]
  }).then(context => {
    this.setState({ context })
  })
}

  onLogin = (error = null, account) => {
    if (!this.state.account) {
      this.setState({account})
    }
    if (!this.state.walletId) {
      // Check if there is a wallet, if not create it
      let walletInfo = account.getFirstWalletInfo('wallet:ethereum')
      if (walletInfo) {
        this.setState({walletId: walletInfo.id})
      } else {
        account.createCurrencyWallet('wallet:ethereum', {
          name: 'My First Wallet',
          fiatCurrencyCode: 'iso:USD'
        }).then(wallet => {
          this.setState({ wallet })
          this.setState({walletId: wallet.id})
        })
      }
    }
  }

  _onPinPress(){
    const { navigate } = this.props.navigation;
     // navigate('MenuOptions');
     navigate('Identity', {
       julie: 1234123,
     });
  }

  renderLoginApp = () => {
    if (this.state.account) {
      return (
        <View>
          <Button onPress={() => this._onPinPress()} title="press"/>
        </View>
      );
    }

    if (this.state.context && !this.state.account) {
      return (
        <LoginScreen
          context={this.state.context}
          onLogin={this.onLogin.bind(this)}
          accountOptions={{}}
        />
      );
    }
    return <Text style={styles.welcome}>Loading</Text>;
  };

  render() {
      return (
        <View style={styles.container}>{this.renderLoginApp()}</View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
