import { StyleSheet, Text, Modal, View, Image, TouchableHighlight, Alert } from 'react-native';
import React from 'react';
import styles from '../assets/styles';
import { Button } from 'react-native-button';
import round from '../assets/round.png';
import plus from '../assets/plus.png';
import { connect } from "react-redux";
import {
  // getBalance,
  // debitTrans,
  // addWallet,
  // deleteWallet,
  // switchWallet
} from '../actions/WalletActions';

///////  All this wallet balance stuff, 
class Wallet extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    modalVisible: false,
    
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={localStyles.headerBox}><Text style={localStyles.headerText}>Wallets</Text></View>,
  });

  componentDidMount = () => {
    console.log(this.state)
    console.log(this.props, 'props')
    this._getTotUs(this.props.balance);
  }

  // setModalVisible() {
  //   console.log(this.state.modalVisible)
  //   this.setState({ modalVisible: !this.state.modalVisible });
  // }

  // _addWallet = (walObj) => {
  //   this.props.addWallet(walObj)
  //   console.log(this.state);
  //   this.setModalVisible();
  // }
  // _getWallets = () => {
  //   let walletArray = iconsArray.map((x, idx) => {
  //     console.log(x.icon, x.currency, '_getwallets');
  //     //  return (<Text key={idx} style={walletLabelStyles.walletCoinName}>{x.currency}</Text>)
  //     return <TouchableHighlight key={idx} style={walletLabelStyles.walletLabelField} onPress={() => this._addWallet(x)}>
  //       <View style={walletLabelStyles.walletLabelField}>
  //         <Image style={walletLabelStyles.walletIcon} source={x.icon} />
  //         <Text style={walletLabelStyles.walletCoinName}>{x.currency}</Text>
  //         <Image style={walletLabelStyles.walletIcon} source={plus} />
  //       </View>
  //     </TouchableHighlight>
  //   })
  //   return walletArray;
  // }

  // _onPayment = (pay) => {
  //   console.log(pay, 'onpayment');
  //   this.props.debitTrans(pay);
  // }


  _getTotUs = () => {
    let hercs = this.props.currentBalance;
    console.log(hercs, "hercs in getTotUs");
    let totUs = (hercs * (.6)).toFixed(2);
    console.log(totUs, " after conversion to dollars");
    return (totUs)
  }

  render() {

    let balance = this.props.currentBalance;
    let usValue = this._getTotUs();
    // let wallets = this._getWallets();
    // console.log(iconsArray.filter(coin => coin.currency === 'HERC'));
    // Method to render the currently selected coin's icon. 
    // let currentCoin = iconsArray.filter(coin => coin.currency === this.props.currentWallet)

    return (
      <View style={styles.container}>
      <View style={[styles.containerCenter, { paddingTop: 25 }]}>
        {/* <View style={[styles.containerCenter, { paddingTop: 25 }]}> */}
        <View style={localStyles.balanceContainer}>

          <View style={localStyles.centerBalance}>
          <Text style={localStyles.text}>Balance: {this.props.currentWallet}</Text>

          <View style={localStyles.tokenValueContainer}>
            <Image style={localStyles.icon} source={round} />
            <Text style={localStyles.currencyValue}>{balance}</Text>
            {/* <Text style={localStyles.text}>{this.state.selectedCurrency}</Text> */}
          </View>

          <Text style={localStyles.usdValue}>{usValue} USD</Text>
          <View style={{ flexDirection: 'row', width: '60%', height: 50, justifyContent: 'space-around', alignItems: 'center' }}>
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
          </Modal> */}
          </View>
        {/* <Text style={localStyles.text}> QR Code Generator/Reader </Text> */}
      </View>
       </View>
    );
  }
};

const mapStateToProps = state => ({
  currentBalance: state.WalletReducers.currentBalance,
  originalBalance: state.WalletReducers.origBalance,
  currentWallet: state.WalletReducers.wallet,
  // ownedWallets: state.WalletReducers.wallets
})

const mapDispatchToProps = dispatch => ({
  debitTrans: (amount) => dispatch(debitTrans(amount)),
  addWallet: (walletName) => dispatch(addWallet(walletName)),
  switchWallet: (walletName) => dispatch(switchWallet(walletName)),
  deleteWallet: (walletName) => dispatch(deleteWallet(walletName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const localStyles = StyleSheet.create({
  centerBalance: {
    height: "100%",
    // borderWidth: 3,
    // borderColor: "red",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    // marginTop: "20%",
  },
  balanceContainer: {
    borderColor: "gold",
    borderWidth: 3,
    borderRadius: 10,
    minWidth: 250,
    height: 150,
    backgroundColor: 'silver',
    // paddingLeft: 10,
    // paddingRight: 10,
    alignSelf: "center"
  },
  tokenValueContainer: {
    borderColor: "#091141",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderRadius: 25,
    flexDirection: 'row',
    height: "30%",
    minWidth: 245,
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: 'white',
  },
  icon: {
    height: 30,
    width: 30,
    // margin: 5,
    borderRadius: 30 / 2,
    resizeMode: "contain",

  },

  walletsField: {
    marginTop: 10,
    width: "100%",
    // height: "7%",
    flex: 1,
    backgroundColor: 'blue'
  },
  picker: {
    width: "50%",
    height: 120,
    color: "white"

  },
  currencyValue: {
    fontSize: 30,
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
  },

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
    // textAlign:'center',
    // textAlignVertical: 'center',
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
    // fontFamily: 'dinPro',
    fontSize: 14,
    margin: 2,
    marginLeft: 5,
    textAlign: 'left'
  },

  coinBalance: {
    fontSize: 10,
    marginRight: 5,

  }

})
