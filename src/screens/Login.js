import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { LoginScreen } from 'edge-login-ui-rn';
import { YellowBox } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';
import store from "../store";
import { ethereumCurrencyPluginFactory } from 'edge-currency-ethereum';
import { getAccount, authToken } from "../actions/AssetActions";
import { WEB_SERVER_API_TOKEN, WEB_SERVER_API_IDOLOGY_CHECK } from "../components/settings";
import { makeEdgeContext } from 'edge-core-js';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);


class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      account: null,
      walletId: null,
      wallet: null,
      token: null
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
    console.log('ar: OnLogin error', error)
    console.log('ar: OnLogin account', account)
    if (!this.state.account) {
      this.setState({account})
      this.props.getAccount(account.username);
      axios.get(WEB_SERVER_API_TOKEN + account.username)
        .then( response => {
          this.setState({
            token: response.data
          })
          this.props.authToken(this.state.token)
        })
        .catch ( err => {
          console.log(err)
        })
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

  renderLoginApp = () => {
    if (this.state.account) {
      const AUTH_TOKEN = store.getState().AssetReducers.auth_token
      const config = {
        headers: {
            'Authorization': AUTH_TOKEN,
            'Access-Control-Allow-Headers': 'x-access-token',
            'x-access-token': AUTH_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      axios.get(WEB_SERVER_API_IDOLOGY_CHECK, {headers: config.headers})
        .then(response => {
          if (response.data.status == "true"){
            const { navigate } = this.props.navigation;
            navigate('MenuOptions');
          } else {
            const { navigate } = this.props.navigation;
            navigate('Identity');
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (this.state.context && !this.state.account) {
      return (
        <LoginScreen
          context={this.state.context}
          onLogin={this.onLogin}
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

const mapStateToProps = (state) => ({
    edge_account: state.AssetReducers.edge_account,
    auth_token: state.AssetReducers.auth_token
});

const mapDispatchToProps = (dispatch) => ({
    getAccount: (edge_account) =>
        dispatch(getAccount(edge_account)),
    authToken: (auth_token) =>
          dispatch(authToken(auth_token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
