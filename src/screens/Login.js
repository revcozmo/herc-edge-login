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
import { getUsername, getAccount, authToken, getEthAddress, getWallet, updateBalances } from "../actions/WalletActActions";
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
    appId: 'com.herc',
    vendorName: 'Chain Net',
    vendorImageUrl: 'https://s3.us-east-2.amazonaws.com/hercmedia/hLogo.png',
    plugins: [ethereumCurrencyPluginFactory]
  }).then(context => {
    this.setState({ context })
  })
}

  onLogin = async (error = null, account) => {
    let tokenHerc = {
      currencyName: 'Hercules', // 0x6251583e7d997df3604bc73b9779196e94a090ce
      contractAddress: '0x6251583e7D997DF3604bc73B9779196e94A090Ce',
      currencyCode: 'HERC',
      multiplier: '1000000000000000000'
    };
    let customHercTokens = {
      tokens: [ "HERC", "HERCULES" ]
    };
    if (!this.state.account) {
      this.setState({account})
      this.props.getAccount(account);
      this.props.getUsername(account.username);
      axios.get(WEB_SERVER_API_TOKEN + account.username)
        .then( response => {
          let token = response.data
          this.props.authToken(token)
          firebase.auth().signInWithCustomToken(token).catch( error => { console.log(error) })
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
          .then(async wallet => {
            wallet.watch('balances', (newBalances) => this.props.updateBalances(newBalances));
            const tokens = await wallet.getEnabledTokens()
            console.log(tokens,'chance enabled tokens') // => ['WINGS', 'REP']

            this.props.getEthAddress(wallet.keys.ethereumAddress)
            this.props.getWallet(wallet)
            wallet.addCustomToken(tokenHerc)
            wallet.enableTokens(customHercTokens).catch(err => {console.log(err, "chance enable token err")})
            this.setState({wallet})
            return wallet
          })
      } else {
        account.createCurrencyWallet('wallet:ethereum', {
          name: 'My First Wallet',
          fiatCurrencyCode: 'iso:USD'
        }).then(async wallet => {
          wallet.watch('balances', (newBalances) => this.props.updateBalances(newBalances));
          this.props.getEthAddress(wallet.keys.ethereumAddress)
          this.props.getWallet(wallet)
          wallet.addCustomToken(tokenHerc)
          wallet.enableTokens(customHercTokens).catch(err => {console.log(err, "chance enable token err")})
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
      dispatch(getAccount(account)),
    updateBalances: (newBalances) =>
      dispatch(updateBalances(newBalances))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
