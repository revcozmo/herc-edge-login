import { StyleSheet, Text, TextInput, Modal, View, Image, Button, TouchableHighlight, Alert, Clipboard } from 'react-native';
import React from 'react';
import styles from '../assets/styles';
import NewButton from 'react-native-button';
import round from '../assets/round.png';
import plus from '../assets/plus.png';
import { connect } from "react-redux";
import QRCode from 'react-qr-code';

import {
  // getBalance,
  // debitTrans,
  // addWallet,
  // deleteWallet,
  // switchWallet
} from '../actions/WalletActActions';
import BigNumber from 'bignumber.js';

///////  All this wallet balance stuff,
class Wallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDenom: 'wei',
      balance: "",
      ethereumAddress: "",
      destAddress: "",
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={localStyles.headerBox}><Text style={localStyles.headerText}>Wallets</Text></View>,
  });

  componentDidMount = () => {
    console.log(this.setState({ balance: this.props.wallet.getBalance(this.props.currencyCode) }));
    console.log(this.setState({ethereumAddress: this.props.ethereumAddress}))
    console.log(this.props, 'props');
    let options = {currencyCode: 'TRX'};

    const trxReceiveAdd = this.props.wallet.getReceiveAddress(options, function(error, trxRecieveAdd) {
        if(!error) { console.log(trxReceiveAdd) }
      });
  }

  async _onPressSend() {
      const wallet = this.props.wallet
      const destWallet = '0xf9f22fbec78f9578de711cc2ac3d030dddb15f73'
      // let destWallet = this.state.destWallet
      if (!destWallet) Alert.alert("Missing Destination Address");
      const abcSpendInfo = {
        networkFeeOption: 'standard',
        currencyCode: 'ETH',
        metadata: {
          name: 'Transfer From Herc Wallet to Logan',
          category: 'Transfer:Wallet:College Fund'
        },
        spendTargets: [
          {
            publicAddress: destWallet,
            nativeAmount: '10000000000000' // 1.2 ETH
          }
        ]
      }
      let abcTransaction = await wallet.makeSpend(abcSpendInfo)
      await wallet.signTx(abcTransaction)
      await wallet.broadcastTx(abcTransaction)
      await wallet.saveTx(abcTransaction)

      console.log("Sent transaction with ID = " + abcTransaction.txid)
      Alert.alert("Transaction ID: " + abcTransaction.txid)
    }

    _changeBalanceDenom = () => {
    let converting = new BigNumber(this.state.balance);

      this.state.currentDenom === 'wei'
        ? this.setState({
          balance: converting.times(1e-18).toString(),
          currentDenom: 'standard'
        })
        : this.setState({
          currentDenom: 'wei',
          balance: this.props.wallet.getBalance(this.props.currencyCode)
        });
    }

    _addWallet = (walObj) => {
      this.props.addWallet(walObj)
      console.log(this.state);
      this.setModalVisible();
    }

    writeToClipboard = async () => {
      await Clipboard.setString(this.state.ethereumAddress);
      Alert.alert(this.state.ethereumAddress + '\n Copied to Clipboard!');
    };

    render() {
      console.log(this.state.currentDenom, this.state.balance, 'hopefully some good news')
      console.log(this.props.wallet.balances);

      return (
        <View style={styles.container}>
          <View style={[styles.containerCenter, { paddingTop: 25 }]}>
            <View style={localStyles.balanceContainer}>
              <View style={localStyles.centerBalance}>
                <QRCode value="{this.state.ethereumAddress}" />
                <Button
                  onPress={this.writeToClipboard}
                  title="Copy to Clipboard"
                />
                  {/* <TextInput
                    onChangeText={destAddress =>
                      this.setState({ destAddress: destAddress })
                    }
                    placeholder="Destination Address"
                  />
                  <NewButton onPress={() => this._onPressSend()}>Send</NewButton> */}
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const mapStateToProps = state => ({
    ethereumAddress: state.WalletActReducers.ethereumAddress, //the address
    currencyCode: state.WalletActReducers.wallet.currencyInfo.currencyCode,
    availableWallets: state.WalletActReducers.walletTypes,
    wallet: state.WalletActReducers.wallet, //the object
    balanceInWei: state.WalletActReducers.wallet.balances[state.WalletActReducers.wallet.currencyInfo.currencyCode],
    // originalBalance: state.WalletActReducers.origBalance,
    // currentWallet: state.WalletActReducers.wallet,
    // ownedWallets: state.WalletReducers.wallets
  })

  const mapDispatchToProps = dispatch => ({
    // debitTrans: (amount) => dispatch(debitTrans(amount)),
    // Wallet: (walletName) => dispatch(addWallet(walletName)),
    // switchWallet: (walletName) => dispatch(switchWallet(walletName)),
    // deleteWallet: (walletName) => dispatch(deleteWallet(walletName))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const localStyles = StyleSheet.create({
  centerBalance: {
    height: "100%",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  balanceContainer: {
    borderColor: "gold",
    borderWidth: 3,
    borderRadius: 10,
    width: '95%',
    height: '100%',
    backgroundColor: 'silver',
    alignSelf: "center"
  },
  tokenValueContainer: {
    borderColor: "#091141",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: "30%",
    width: "100%",
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: 'white',
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    resizeMode: "contain",
  },
  walletsField: {
    marginTop: 10,
    width: "100%",
    flex: 1,
    backgroundColor: 'blue'
  },
  picker: {
    width: "50%",
    height: 120,
    color: "white"
  },
  currencyValue: {
    fontSize: 26,
    color: "black"
  },
  usdValue: {
    fontSize: 20,
    color: 'black'
  },

  headerBox: {
    alignItems: "center",
    flex: 1
  },
  headerText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "normal"
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
  addWalletField: {
    height: 50,
    flexDirection: "row",
    width: "80%",
    backgroundColor: 'blue',
    justifyContent: "space-around",
    margin: 10,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  }
})

const walletLabelStyles = StyleSheet.create({
  walletLabelField: {
    height: 24,
    width: 225,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    margin: 2,
    backgroundColor: "white",
    alignSelf: "center"

  },
  walletIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    borderRadius: 20 / 2
  },
  walletCoinName: {
    fontSize: 14,
    margin: 2,
    marginLeft: 5,
    textAlign: 'left'
  },
  coinBalance: {
    fontSize: 10,
    marginRight: 5,
    color: 'yellow'
  }
})
