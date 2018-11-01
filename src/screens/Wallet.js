import { StyleSheet, Text, TextInput, Modal, View, Image, Button, TouchableHighlight, ScrollView, Alert, Clipboard, Linking } from 'react-native';
import React from 'react';
import styles from '../assets/styles';
import { NewButton } from 'react-native-button';
import round from '../assets/round.png';
import plus from '../assets/plus.png';
import { connect } from "react-redux";
import {
  // getBalance,
  // debitTrans,
  // addWallet,
  // deleteWallet,
  // switchWallet
} from '../actions/WalletActActions';
import BigNumber from 'bignumber.js';
import QRCode from 'react-qr-code';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

///////  All this wallet balance stuff,
class Wallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDenom: 'wei',
      balance: "",
      ethereumAddress: "",
      destAddress: "",
      sendAmount: "",
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={localStyles.headerBox}><Text style={localStyles.headerText}>Wallets</Text></View>,
  });

  componentDidMount = () => {
    this.setState({ ethereumAddress: this.props.ethereumAddress })
    this._updateWallet();
    let options = { currencyCode: 'TRX' };
    const trxReceiveAdd = this.props.wallet.getReceiveAddress(options, function (error, trxRecieveAdd) {

      if (!error) {
        console.log(trxReceiveAdd, "get receive address for TRX")
      }
    });
  }

  _updateWallet = () => {
    let displayWallet = this.state.displayWallet;
    let balance = new BigNumber(this.props.wallet.getBalance({ currencyCode: displayWallet }));
    this.setState({ balance: balance.times(1e-18).toFixed(18) });
  }

  async _makeCustomHercWallet() {
    // create a regular wllet
    // this.props.account.createCurrencyWallet('wallet:ethereum', {
    //   name: 'Chances Wallet',
    //   fiatCurrencyCode: 'iso:USD'
    // })

    //enable TRX in current wallet
    var tokenHerc = {
      currencyName: 'Tron',
      contractAddress: '0xf230b790e05390fc8295f4d3f60332c93bed42e2',
      currencyCode: 'TRX',
      multiplier: '1000000000000000000'
    };
    const customTokens = {
      tokens: ["TRX", "TRON"]
    }
    this.props.wallet.addCustomToken(tokenHerc)
    this.props.wallet.enableToken(customTokens)
  }

  async _onPressSend() {
    const wallet = this.props.wallet
    let destAddress = this.state.destAddress
    let sendAmountInEth = new BigNumber(this.state.sendAmount)
    if (!destAddress) Alert.alert("Missing Destination Address");
    if (!sendAmountInEth) Alert.alert("Invalid Send Amount");
    let sendAmountInWei = sendAmountInEth.times(1e18).toString()

    const abcSpendInfo = {
      networkFeeOption: 'standard',
      currencyCode: 'HERC',
      metadata: {
        name: 'Transfer From Herc Wallet',
        category: 'Transfer:Wallet:College Fund'
      },
      spendTargets: [
        {
          publicAddress: destAddress,
          nativeAmount: sendAmountInWei
        }
      ]
    }
    // catch error for "ErrorInsufficientFunds"
    let abcTransaction = await this.props.wallet.makeSpend(abcSpendInfo)
    await wallet.signTx(abcTransaction)
    await wallet.broadcastTx(abcTransaction)
    await wallet.saveTx(abcTransaction)
    // TODO: after successful transaction, reset state.

    console.log("Sent transaction with ID = " + abcTransaction.txid)
    Alert.alert(
      'Transaction ID',
      abcTransaction.txid,
      [
        { text: 'Copy', onPress: () => this.writeToClipboard(abcTransaction.txid), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }

  writeToClipboard = async (data) => {
    await Clipboard.setString(data);
    Alert.alert('Copied to Clipboard!', data);
  };


  // setModalVisible() {
  //   console.log(this.state.modalVisible)
  //   this.setState({ modalVisible: !this.state.modalVisible });
  // }


  _changeBalanceDenom = () => {
    let converting = new BigNumber(this.state.balance);

    this.state.currentDenom === 'wei'
      ? this.setState({
        balance: converting.times(1e-18).toString(),
        currentDenom: 'standard'
      })
      : this.setState({
        currentDenom: 'wei',
        balance: this.props.wallet.getBalance({ currencyCode: 'HERC' })
      });
  }


  _addWallet = (walObj) => {
    this.props.addWallet(walObj)
    console.log(this.state);
    this.setModalVisible();
  }

  // _onPayment = (pay) => {
  //   console.log(pay, 'onpayment');
  //   this.props.debitTrans(pay);
  // }


  // _getTotUs = () => {
  //   let hercs = this.props.currentBalance;
  //   console.log(hercs, "hercs in getTotUs");
  //   let totUs = (hercs * (.6)).toFixed(2);
  //   console.log(totUs, " after conversion to dollars");
  //   return (totUs)
  // }

  _radioButtons = () => {
    let radio_props = [];
    let walBal = this.props.wallet.balances;
    let walletParamsArr = Object.keys(walBal);
    let walletList = walletParamsArr.map((currentItem, currentIndex) => {
      radio_props.push({ label: currentItem, value: currentItem })
    });

    return (
      <View>
        <RadioForm
          formHorizontal={true}
          labelColor={'silver'}
          selectedLabelColor={'gold'}
          radio_props={radio_props}
          initial={0}
          radioStyle={{ paddingRight: 30 }}
          onPress={(value) => { this.setState({ displayWallet: value }, () => this._updateWallet()) }}
        />
      </View>
    )
  }


  render() {


    // console.log(this.state.currentDenom, this.state.balance, 'hopefully some good news')
    // console.log(this.props.wallet.balances);

    // let usValue = this._getTotUs();
    // let wallets = this._getWallets();
    // console.log(iconsArray.filter(coin => coin.currency === 'HERC'));
    // Method to render the currently selected coin's icon.
    // let currentCoin = iconsArray.filter(coin => coin.currency === this.props.currentWallet)

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.containerCenter, { paddingTop: 25 }]}>

            {this._radioButtons()}

            <View style={localStyles.balanceContainer}>

              <View style={localStyles.centerBalance}>
                <Text style={localStyles.text}>{this.state.displayWallet} Balance:</Text>

                <View style={localStyles.tokenValueContainer}>
                  <Image style={localStyles.icon} source={round} />

                  <Text style={localStyles.currencyValue}>{this.state.balance}</Text>
                  {/* <Text style={localStyles.currencyValue}>{balance}</Text> */}
                  {/* <Text style={localStyles.text}>{this.state.selectedCurrency}</Text> */}
                </View>

                {/* <Text style={localStyles.usdValue}>{usValue} USD</Text> */}
                <View style={{ flexDirection: 'row', width: '60%', height: 50, justifyContent: 'space-around', alignItems: 'center' }}>

                  <Text style={localStyles.text} onPress={() => this._changeBalanceDenom()}>ChangetheDenom</Text>


                </View>
              </View>

              {/* <View style={localStyles.addWalletField}>
          <TouchableHighlight onPress={() => this.setModalVisible()}>
            <View>
              <Text style={localStyles.text}>Add Wallet(pending)</Text>
              <Image style={localStyles.icon} source={plus} />
            </View>
          </TouchableHighlight>

        </View> */}
              {/* <View style={{ alignItems: 'center', height: 200, width: 300, alignContent: 'center', justifyContent: 'space-around', backgroundColor: 'green' }}>

          <Wallet coin={this.props.currentWallet} icon={round} />

        </View> */}

              {/* <Text style={localStyles.text}> Address: {this.state.monies[this.state.currency].address}</Text> */}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, width: 300, alignContent: 'center', justifyContent: 'space-around' }}>
          <View style={{ height: 30, width: 100, backgroundColor: "yellow", borderRadius: 5, }}>
            <Text style={localStyles.buttonText}>Send</Text>
          </View>

          <View style={{ height: 30, width: 100, backgroundColor: "green", borderRadius: 5, }}>
            <TouchableHighlight onPress={() => this._onPayment(5)}>
              <Text style={localStyles.buttonText}>Receive</Text>
            </TouchableHighlight>
          </View> */}

              {/* <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.container}>
              <Text style={localStyles.currencyValue}>Available Wallets</Text>
              <View style={localStyles.walletsField}>
                <Text style={localStyles.buttonText}>
                  {this.props.balance}
                </Text>
                {wallets}
              </View>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible();
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <TouchableHighlight
            style={{ marginTop: 10 }}
            onPress={() => this._makeCustomHercWallet()}>
            <Text style={{ color: "white", marginTop: 10 }}>
              makeCustomTronWallet
            </Text>
          </TouchableHighlight>

*/}

            </View>
            <TextInput
              style={{ width: "80%", marginTop: "5%", textAlign: "center", borderColor: "gold", borderWidth: 1, borderRadius: 10, color: "white" }}
              onChangeText={(destAddress) =>
                this.setState({ destAddress })
              }
              placeholderTextColor="silver"
              placeholder="Destination Address"
              value={this.state.text}
              underlineColorAndroid='transparent'
              selectionColor={'gold'}
            />
            <TextInput
              style={{ width: "80%", marginTop: "5%", textAlign: "center", borderColor: "gold", borderWidth: 1, borderRadius: 10, color: "white" }}
              onChangeText={(sendAmount) =>
                this.setState({ sendAmount })
              }
              placeholderTextColor="silver"
              placeholder="Amount(ETH)"
              underlineColorAndroid='transparent'
              selectionColor={'gold'}
            />

            <TouchableHighlight
              style={{ marginTop: 10 }}
              onPress={() => this._onPressSend()}>
              <Text style={{ backgroundColor: "green", width: 100, lineHeight: 30, height: 30, borderRadius: 5, color: "white", textAlign: "center", justifyContent: "center", alignContent: "center" }}>Send</Text>
            </TouchableHighlight>

            <View
              style={{
                marginTop: '10%',
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                width: '100%'
              }}
            />

            <View style={{ marginTop: "10%", alignContent: "center", alignItems: "center", margin: 5 }}>
              <View style={{ borderWidth: 10, borderColor: 'white' }}>
                <QRCode size={140} value={this.state.ethereumAddress} />
              </View>
              <Text style={{ color: "white", marginTop: 10 }}>
                {this.state.ethereumAddress}
              </Text>
              <TouchableHighlight onPress={() => { this.writeToClipboard(this.state.ethereumAddress) }
              }>
                <Text style={{ marginTop: 10, backgroundColor: "#4c99ed", width: 100, lineHeight: 30, height: 30, borderRadius: 5, color: "white", textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                  Copy
              </Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                Linking.openURL("https://purchase.herc.one/");
              }}>
                <View>
                  <Text style={{ marginTop: "30%", color: "white", textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                    Top Up HERCs
                </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => ({
  ethereumAddress: state.WalletActReducers.ethereumAddress,
  currencyCode: state.WalletActReducers.wallet.currencyInfo.currencyCode,
  availableWallets: state.WalletActReducers.walletTypes,
  wallet: state.WalletActReducers.wallet,
  balanceInWei: state.WalletActReducers.wallet.balances[state.WalletActReducers.wallet.currencyInfo.currencyCode],
  account: state.WalletActReducers.account,
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
    height: 150,
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
