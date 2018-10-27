import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { LoginScreen } from 'herc-edge-login-ui-rn';
import { YellowBox } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';
import { ethereumCurrencyPluginFactory } from 'edge-currency-ethereum';
import { getUsername, getAccount, authToken, getEthAddress, getWallet } from "../actions/WalletActActions";
import { WEB_SERVER_API_TOKEN, WEB_SERVER_API_IDOLOGY_CHECK } from "../components/settings";
import { makeEdgeContext } from 'edge-core-js';
import { EDGE_API_KEY } from '../components/settings.js'
import firebase from "../constants/Firebase";
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
      wallet: null
    }
  makeEdgeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: EDGE_API_KEY,
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
      this.props.getAccount(account);
      this.props.getUsername(account.username);
      axios.get(WEB_SERVER_API_TOKEN + account.username)
        .then( response => {
          let token = response.data
          this.props.authToken(token)
          firebase.auth().signInWithCustomToken(token)
            .then( user_login => { console.log(user_login, "firebase userlogin") })
            .catch( error => { console.log(error) })
          axios.defaults.headers.common = {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
          };
        })
        .then(() => {
          axios.get(WEB_SERVER_API_IDOLOGY_CHECK)
          .then(response => {
            const { navigate } = this.props.navigation;
            response.data.status == "true" ? navigate('MenuOptions') : navigate('Identity');
          })
          .catch( err => { console.log(err) })
        })
        .catch ( err => { console.log(err) })
    }
    if (!this.state.walletId) {
      // Check if there is a wallet, if not create it
      let walletInfo = account.getFirstWalletInfo('wallet:ethereum')
      if (walletInfo) {
        this.setState({walletId: walletInfo.id})
        account.waitForCurrencyWallet(walletInfo.id)
          .then(wallet => {
            this.props.getEthAddress(wallet.keys.ethereumAddress)
            this.props.getWallet(wallet)
            this.setState({wallet})
            return wallet
          })
      } else {
        account.createCurrencyWallet('wallet:ethereum', {
          name: 'My First Wallet',
          fiatCurrencyCode: 'iso:USD'
        }).then(wallet => {
          this.props.getEthAddress(wallet.keys.ethereumAddress)
          this.props.getWallet(wallet)
          this.setState({ wallet })
          this.setState({walletId: wallet.id})
        })
      }
    }
  }

  renderLoginApp = () => {
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
    ethereumAddress: state.AssetReducers.getEthAddress,
    wallet: state.AssetReducers.wallet
});

const mapDispatchToProps = (dispatch) => ({
    getUsername: (edge_account) =>
        dispatch(getUsername(edge_account)),
    authToken: (auth_token) =>
              dispatch(authToken(auth_token)),
    getEthAddress: (ethereumAddress) =>
      dispatch(getEthAddress(ethereumAddress)),
    getWallet: (wallet) =>
      dispatch(getWallet(wallet)),
    getAccount: (account) =>
      dispatch(getAccount(account))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
