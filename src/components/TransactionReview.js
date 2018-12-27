import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, ScrollView, YellowBox, Modal, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import submit from "./buttons/submit.png";
import { sendTrans } from "../actions/AssetActions";
import fee from "../assets/hercLogoPillar.png";
import newOriginator from "./buttons/originatorButton.png";
import newRecipient from "./buttons/recipientButton.png";
import modalStyle from "../assets/confModalStyles";
import { TOKEN_ADDRESS, DEVELOPERS } from "../components/settings"
import BigNumber from 'bignumber.js';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);
import store from "../store"

class TransRev extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: false,
            balance: null,
        }
    }
    componentDidMount = () => {
        try {
          let balance = new BigNumber(this.props.watchBalance["HERC"])
          this.setState({ balance: balance.times(1e-18).toFixed(6) })
        } catch(e) {
          let balance =  new BigNumber(this.props.wallet.balances['HERC'])
          this.setState({ balance: balance.times(1e-18).toFixed(6) })
        }
    }

  _onPressSubmit(){
    if (Object.keys(this.props.transDat).length > 0){
      let total = parseFloat(this._getPrices()) + 0.000032
      Alert.alert(
        'Data Fee: '+ this._getPrices().toString() +' HERC \nBurn Amount: 0.000032 HERC',
        'Total: '+ total + ' HERC \n Do you authorize this payment?' ,
        [
          {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this._checkBalance() },
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Oh no!',
        'This is an empty submission',
        [
          {text: 'Ok', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: true }
      )
    }
  }

  async _checkBalance(){
    if (!this.state.balance) {return}
    // check if user is a developer
    if (DEVELOPERS.includes(this.props.edgeAccount)){
      // this is a developer
      // skip a price checks, bypass being charged
      this._sendTrans()
    } else {
      // this is a non-developer
      let dataFee = new BigNumber(this._getPrices())

      let total = parseFloat(this._getPrices()) + 0.000032
      let convertingPrice = new BigNumber(total) // don't have to times 1e18 because its already hercs
      let balance = new BigNumber(this.state.balance)

      let newbalance = balance.minus(convertingPrice)

      console.log('do you have enough?', newbalance.isPositive())
      if (newbalance.isNegative()){
        Alert.alert(
          'Insufficient Funds',
          'Balance: '+ this.state.balance + ' HERC' ,
          [
            {text: 'Top Up Hercs', onPress: () => Linking.openURL("https://purchase.herc.one/"), style: 'cancel'},
            {text: 'Ok', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      } else {
        this.setState({ modalVisible: true })
        const burnSpendInfo = {
          networkFeeOption: 'standard',
          currencyCode: 'HERC',
          metadata: {
            name: 'Transfer From Herc Wallet',
            category: 'Transfer:Wallet:Burn Amount'
          },
          spendTargets: [
            {
              publicAddress: TOKEN_ADDRESS,
              nativeAmount: "0.000032"
            }
          ]
        }
        const dataFeeSpendInfo = {
          networkFeeOption: 'standard',
          currencyCode: 'HERC',
          metadata: {
            name: 'Transfer From Herc Wallet',
            category: 'Transfer:Wallet:Data Fee'
          },
          spendTargets: [
            {
              publicAddress: "0x1a2a618f83e89efbd9c9c120ab38c1c2ec9c4e76",
              nativeAmount: dataFee.toString()
            }
          ]
        }
        // catch error for "ErrorInsufficientFunds"
        // catch error for "ErrorInsufficientFundsMoreEth"
        let wallet = this.props.wallet
        try {
          let burnTransaction = await wallet.makeSpend(burnSpendInfo)
          await wallet.signTx(burnTransaction)
          await wallet.broadcastTx(burnTransaction)
          await wallet.saveTx(burnTransaction)
          console.log("Sent burn transaction with ID = " + burnTransaction.txid)

          let dataFeeTransaction = await wallet.makeSpend(dataFeeSpendInfo)
          await wallet.signTx(dataFeeTransaction)
          await wallet.broadcastTx(dataFeeTransaction)
          await wallet.saveTx(dataFeeTransaction)
          console.log("Sent dataFee transaction with ID = " + dataFeeTransaction.txid)


          if (burnTransaction.txid && dataFeeTransaction.txid) {
            this._sendTrans()
          }
        } catch(e){
          let tempBalance = new BigNumber(this.props.watchBalance["ETH"])
          let ethBalance = tempBalance.times(1e-18).toFixed(6)
          this.setState({ modalVisible: false })
          Alert.alert(
            'Insufficient ETH Funds',
            'Balance: '+ ethBalance + ' ETH' ,
            [
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      }
    }
  }

  _changeModalVisibility = (visible) => {
      this.setState({
          modalVisible: visible
      })
  }

  _sendTrans() {
    this.props.sendTrans(this._getPrices())
    }


  _getPrices = () => {

      let transDat = this.props.transDat;
      let price = 0;
      let imgPrice = 0;
      let docPrice = 0;

      if (transDat.images) {
          imgPrice = ((transDat.images.size / 1024) * .00000002) / .4
          console.log(imgPrice, "chance IMAGEPRICE")
      };

      if (transDat.documents) {
          docPrice = .000032
      }

      if ((docPrice + imgPrice) !== 0) {
          price = (docPrice + imgPrice) + .000032;
      }

      let convertingPrice = new BigNumber(price)
      let newPrice = convertingPrice.toFixed(6)

      return (
        newPrice
      )
  }


    _hasImage = (transDat) => {
        if (transDat.images) {
            let imgPrice = ((transDat.images.size / 1024) * .00000002) / .4
            return (
                <View style={localStyles.imgContainer}>
                    <Text style={localStyles.transRevTime}>Images</Text>
                    <Image style={localStyles.thumb} source={{ uri: transDat.images.image }} />
                    <Text style={localStyles.revPropVal}>{(transDat.images.size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{imgPrice.toFixed(8)}</Text>
                    </View>
                </View>
            );

        }
        return (<Text style={localStyles.revPropVal}>No Images</Text>)
    }

    _hasDocuments = (transObj) => {
        if (transObj.documents) {
            let docPrice = .000032;
            return (
                <View style={localStyles.docContainer}>
                    <Text style={localStyles.transRevTime}>Documents</Text>
                    <Text style={localStyles.text}>{transObj.documents.name}</Text>
                    <Text style={localStyles.text}>{(transObj.documents.size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{docPrice.toFixed(6)}</Text>
                    </View>
                </View>
            );
            console.log(transInfo.price, "transprice plus docprice", this.state.docPrice)
        }
        return (<Text style={localStyles.revPropVal}>No Documents</Text>)
    }


    _hasList = (transObj) => {
        if (transObj.properties) {
            list = Object.keys(transObj.properties).map((name, idx) => {
                return (
                    <View key={idx} style={localStyles.revPropField}>
                        <Text style={localStyles.transRevName}>{name}:</Text>
                        <Text style={localStyles.revPropVal}>{transObj.properties[name]}</Text>
                    </View>
                )
            });
            return (
                <View style={localStyles.listContainer}>
                    <Text style={localStyles.transRevTime}>Properties</Text>
                    {list}
                </View>
            )
        }
        return (<Text style={localStyles.revPropVal}>No Properties</Text>)
    }

    _goToMenu = () => {
        // const { navigate } = this.props.navigate;
        this._changeModalVisibility(false);

        this.props.navigate('MenuOptions');

    }

    render() {
        let trans = store.getState().AssetReducers.trans;
        let transInfo = trans.header;
        // let fctPrice = this.state ? this.state.fctPrice : "";
        let transDat = trans.data;
        console.log(transInfo, 'transinfo in transreviewrender', transInfo.price, 'transdata')
        let locationImage = this.props.transInfo.tXLocation === 'recipient' ? newRecipient : newOriginator;
        let list, edit;
        let dTime = transDat.dTime;
        let name = this.props.transInfo.name;
        let transPrice = transInfo.price;

        if (transDat.hasOwnProperty('ediT')) {
            edit = (
                <View style={localStyles.editField}>
                    <Text style={localStyles.transRevTime}>EDI-T-SET:</Text>
                    <Text style={localStyles.text}>{transDat.ediT.name}</Text>
                    <Text style={localStyles.text}>{transDat.ediT.value}</Text>
                </View>)
        }

        /// I'm using a smaller location image locally. localStyles.assetLocationLabel
        return (

            <View style={localStyles.transactionReviewContainer}>
                <Text style={styles.transReview}>Transaction Review</Text>

                {edit}

                {this._hasImage(transDat)}

                {this._hasDocuments(transDat)}

                {this._hasList(transDat)}

                <TouchableHighlight style={{ margin: 10 }} onPress={() => this._onPressSubmit(transPrice)}>
                    <Image source={submit} style={localStyles.submitButton} />
                </TouchableHighlight>
                <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{this._getPrices()}</Text>
                </View>


               <Modal
                    transparent={false}
                    animationType={'none'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this._goToMenu() }}
                >
                    <View style={modalStyle.container}>
                        <View style={modalStyle.modalBackground}>
                          <View style={modalStyle.closeButtonContainer}>
                              <TouchableHighlight
                                style={modalStyle.closeButton}
                                onPress={() => this._goToMenu()}>
                              <Text style={{fontSize: 15, color: '#ffffff'} }>Back to Main</Text>
                              </TouchableHighlight>
                          </View>
                            {!this.props.transDataFlags.confTransComplete &&
                                <Text style={modalStyle.wordsText}>Your Asset Information Is Being Written To The Blockchain. {"\n"}This may take a few minutes. At this point, you cannot cancel the transaction. You may return to Main Menu if you wish.</Text>
                            }
                            <View style={modalStyle.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={!this.props.transDataFlags.confTransComplete} size="large" color="#091141" />
                            </View>

                            {this.props.transDataFlags.confTransComplete &&
                                <View>
                                    <Text style={modalStyle.wordsText}>Your Transaction Has Completed!</Text>
                                    <TouchableHighlight
                                      style={modalStyle.modalButton}
                                      onPress={() => this._goToMenu()}>
                                    <Text style={{ margin: 5} }>Back to Menu</Text>
                                    </TouchableHighlight>
                                </View>
                            }

                        </View>
                    </View>
                </Modal>

            </View>



        )
    }
}

const localStyles = StyleSheet.create({
    transactionReviewContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    submitButton: {
        height: 40,
        width: 200,
        resizeMode: "contain",
        alignSelf: "center",
    },
    assetLocationLabel: {
        height: 30,
        width: 150,
        resizeMode: "contain",
        marginTop: 10,
        alignSelf: "center"
    },
    teePrice: {
        color: "white"
    },
    docContainer: {
        width: "100%",
        height: 100,
    },
    imgContainer: {
        width: "100%",
        height: 125,
        justifyContent: "center"
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 2,
        fontFamily: "dinPro"
    },
    thumb: {
        height: 50,
        width: 50,
        resizeMode: "cover",
        alignSelf: "center",
        margin: 4
    },
    editField: {
        height: 75,
        width: "100%",
        justifyContent: "center",
        padding: 3,
        margin: 10,
    },
    editLabel: {
        fontFamily: "dinPro",
        fontSize: 21,
        color: "yellow",
        margin: 2,
        alignSelf: "center",
    },
    transRevTime: {
        color: "#f3c736",
        fontFamily: "dinPro",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        flexDirection: "column",
    },
    transRevName: {
        fontFamily: "dinPro",
        fontSize: 16,
        color: "white",
        margin: 2,
        textAlign: "left"
    },

    revPropField: {
        height: 20,
        width: 225,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        margin: 2,
        backgroundColor: "#021227",
        alignSelf: "center"
    },
    revPropVal: {
        fontFamily: "dinPro",
        fontSize: 15,
        color: "white",
        //put this margin  top combat an overlap issue
        // marginTop: 20,
        padding: 2,
        textAlign: "center"
    },
    listContainer: {
        margin: 10,
        flex: 1,
        justifyContent: "center"
    },
    feeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5,
    },
    teePrice: {
        fontSize: 10,
        color: "white",
        backgroundColor: "#091141",
        marginRight: 5
    },
    hercPillarIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        borderRadius: 15 / 2
    }
});


const mapStateToProps = (state) => ({
    transInfo: state.AssetReducers.trans.header,
    transDat: state.AssetReducers.trans.data,
    transDataFlags: state.AssetReducers.transDataFlags,
    wallet: state.WalletActReducers.wallet,
    watchBalance: state.WalletActReducers.watchBalance,
    edgeAccount: state.WalletActReducers.edge_account
    // price: state.dataReducer.prices.list.pricePerHercForFCT
})

const mapDispatchToProps = (dispatch) => ({
    sendTrans: (transPrice) => dispatch(sendTrans(transPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransRev);
