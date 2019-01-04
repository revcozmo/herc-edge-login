import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  YellowBox,
  Modal,
  ActivityIndicator,
  Button
} from "react-native";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import styles from "../assets/styles";
import submit from "./buttons/submit.png"; // todo: turn into vector
import { sendTrans } from "../actions/AssetActions";
import fee from "../assets/hLogo.png";
import newOriginator from "./buttons/originatorButton.png"; // todo: turn into vector
import newRecipient from "./buttons/recipientButton.png"; // todo: turn into vector
import modalStyle from "../assets/confModalStyles";
import { TOKEN_ADDRESS } from "../components/settings";
import BigNumber from "bignumber.js";
import store from "../store";

class SupplyChainTransactionReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      balance: null
    };
  }
  componentDidMount = () => {
    this._getDynamicHercValue().then(response =>
      this.setState(
        { hercValue: response }
      )
    );
    // console.log(this._getNetworkFee(), "this is the network fee from component did mount");
    // console.log(this._getDynamicHercValue(), " this is the dynamic herc value, call made in component did mount");
    try {
      let balance = new BigNumber(this.props.watchBalance["HERC"]);
      this.setState({ balance: balance.times(1e-18).toFixed(6) });
    } catch (e) {
      if (this.props.wallet.balances["HERC"]) {
        let balance = new BigNumber(this.props.wallet.balances["HERC"]); // if balances:{} this will NaN
        this.setState({ balance: balance.times(1e-18).toFixed(6) });
      } else {
        let balance = new BigNumber("0");
        this.setState({ balance: balance.times(1e-18).toFixed(6) });
      }
    }
  };

  _onPressSubmit() {
      console.log(this.state, "console logging state on submit**")
    if (Object.keys(this.props.transDat).length > 0) {
      console.log(this.props.transDat);

      let docPrice = parseFloat(this._getDocPrice());
      console.log("this is the docprice", docPrice);
      let imgPrice = parseFloat(this._getImgPrice());
      console.log("this is the img price", imgPrice);
      // let dataFee = parseFloat(this._getDocPrice()) + parseFloat(this._getImgPrice());
      // let dataFee = new BigNumber(this._getDocPrice() + this._getImgPrice())
      // console.log("this is the doc plus the img price", dataFee);
      let burnAmount = parseFloat(this._getBurnAmount());
      console.log("this is the burn amount", burnAmount);
      let networkFee = parseFloat(this._getNetworkFee());
      console.log("this is the network fee", networkFee);
      let dataFee = imgPrice + docPrice;
      let total = imgPrice + docPrice + networkFee;
      Alert.alert(
        "Confirm",
        "Image Fee: \n" +
          imgPrice.toFixed(18) +
          " HERC" +
          "\nDoc Fee: \n" +
          docPrice.toFixed(18) +
          " HERC" +
          "\nNetwork Fee: \n" +
          networkFee.toFixed(18) +
          " HERC" +
          // '\nSecurity Fee: \n' + burnAmount + ' HERC' +
          "\n\nTotal: \n" +
          total.toFixed(18) +
          " HERC" +
          "\n\nDo you authorize this payment?",
        [
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this._checkBalance() }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Oh no!",
        "This is an empty submission",
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    }
  }

  async _checkBalance() {
    if (!this.state.balance) {
      return;
    }
    let dataFee = new BigNumber(this._getDocPrice() + this._getImgPrice());
    let total =
      parseFloat(this._getDocPrice()) +
      parseFloat(this._getBurnAmount()) +
      parseFloat(this._getImgPrice());
    let convertingPrice = new BigNumber(total); // don't have to times 1e18 because its already hercs
    let balance = new BigNumber(this.state.balance);
    let newbalance = balance.minus(convertingPrice);

    console.log("chance, do you have enough?", newbalance.isPositive());

    if (newbalance.isNegative()) {
      Alert.alert(
        "Insufficient Funds",
        "Balance: " + this.state.balance + " HERC",
        [
          {
            text: "Top Up Hercs",
            onPress: () => Linking.openURL("https://purchase.herc.one/"),
            style: "cancel"
          },
          { text: "Ok", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    } else {
      this.setState({ modalVisible: true });
      const burnSpendInfo = {
        networkFeeOption: "standard",
        currencyCode: "HERC",
        metadata: {
          name: "Transfer From Herc Wallet",
          category: "Transfer:Wallet:Burn Amount"
        },
        spendTargets: [
          {
            publicAddress: TOKEN_ADDRESS,
            nativeAmount: burnAmount
          }
        ]
      };
      const dataFeeSpendInfo = {
        networkFeeOption: "standard",
        currencyCode: "HERC",
        metadata: {
          name: "Transfer From Herc Wallet",
          category: "Transfer:Wallet:Data Fee"
        },
        spendTargets: [
          {
            publicAddress: "0x1a2a618f83e89efbd9c9c120ab38c1c2ec9c4e76",
            nativeAmount: dataFee.toString()
          }
        ]
      };
      // catch error for "ErrorInsufficientFunds"
      // catch error for "ErrorInsufficientFundsMoreEth"
      let wallet = this.props.wallet;
      try {
        let burnTransaction = await wallet.makeSpend(burnSpendInfo);
        await wallet.signTx(burnTransaction);
        await wallet.broadcastTx(burnTransaction);
        await wallet.saveTx(burnTransaction);
        console.log("Sent burn transaction with ID = " + burnTransaction.txid);

        let dataFeeTransaction = await wallet.makeSpend(dataFeeSpendInfo);
        await wallet.signTx(dataFeeTransaction);
        await wallet.broadcastTx(dataFeeTransaction);
        await wallet.saveTx(dataFeeTransaction);
        console.log(
          "Sent dataFee transaction with ID = " + dataFeeTransaction.txid
        );

        if (burnTransaction.txid && dataFeeTransaction.txid) {
          this._sendTrans();
        }
      } catch (e) {
        let tempBalance = new BigNumber(this.props.watchBalance["ETH"]);
        let ethBalance = tempBalance.times(1e-18).toFixed(6);
        this.setState({ modalVisible: false });
        Alert.alert(
          "Insufficient ETH Funds",
          "Balance: " + ethBalance + " ETH",
          [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  }

  _changeModalVisibility = visible => {
    this.setState({
      modalVisible: visible
    });
  };

  _sendTrans() {
    let docPrice = parseFloat(this._getDocPrice());
    console.log("this is the docprice", docPrice);
    let imgPrice = parseFloat(this._getImgPrice());
    console.log("this is the img price", imgPrice);
    let burnAmount = parseFloat(this._getBurnAmount());
    console.log("this is the burn amount", burnAmount);
    let networkFee = parseFloat(this._getNetworkFee());
    console.log("this is the network fee", networkFee);
    let total = imgPrice + docPrice + networkFee;
    this.props.sendTrans(this._getPrices());
  }

  _getNetworkFee = () => {
    //Security Fee should be $ 0.000032 worth of hercs. The response should be in hercs.
    //Per Use Fee should be $ 0.000032 worth of hercs. The response should be in Hercs.
    //Network Fee is the combined value of security fee and per use fee. The response should be in Hercs.
    if (this.state.hercValue) {
      let dynamicHercValue = this.state.hercValue;
      let securityFeeInHercs = 0.000032 / dynamicHercValue;
      let perUseFeeInHercs = 0.000032 / dynamicHercValue;
      return securityFeeInHercs + perUseFeeInHercs;
    }
  };

  _getDynamicHercValue = async () => {
    return fetch(
      "https://chart.anthemgold.com/service-1.0-SNAPSHOT/PRICE?symbol=HERCCOMMERCIAL&range=MINUTE_5",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let responseObject = responseJson;
        let highPrice = responseObject.h;
        // this.setState({
        //    hercValue: highPrice
        // })
        return highPrice;
      })
      .catch(error => {
        console.error(error);
      });

    // let dynamicHercValue = 0.27154204;
    // return dynamicHercValue;
  };

  // _getPrices = () => {
  //     let transDat = this.props.transDat;
  //     let price = 0;
  //     let imgPrice = 0;
  //     let docPrice = 0;

  //     if (transDat.images) {
  //         console.log("made it into transdat images")
  //         imgPrice = ((transDat.images.size / 1024) * .00000002) / .4
  //     };

  //     if (transDat.documents) {
  //         docPrice = .000032
  //     }

  //     price = (docPrice + imgPrice) + .000032;
  //     console.log(docPrice, imgPrice, price, 'chance price check')
  //     let convertingPrice = new BigNumber(price)
  //     let newPrice = convertingPrice.toFixed(6)

  //     return (
  //         newPrice
  //     )
  // }

  _getDocPrice = () => {
    /// 12/16/18 docPrice of 200% of .000032 hercs.. That's .000128 hercs
    let transDat = this.props.transDat;

    if (transDat.documents) {
      let docPrice = 0.000032;
      let convertingPrice = new BigNumber(docPrice);
      let newDocPrice = convertingPrice.toFixed(18);
      return newDocPrice;
    } else {
      let docPrice = 0;
      return docPrice;
    }
  };

  _getImgPrice = () => {
    // as of 12/30/18 Image Fee (storj .000000002/kB)
    let transDat = this.props.transDat;
    let dynamicHercValue = this.state.hercValue;

    if (transDat.images) {
      console.log(
        "made it into the transdat images and here is the dynamic herc value from state",
        dynamicHercValue
      );
      let imgPrice =
        ((transDat.images.size / 1024) * 0.00000002) / dynamicHercValue;
      let newImgPrice = imgPrice.toFixed(18);
      console.log(newImgPrice, "this is the new img price on line 285");
      return newImgPrice;
    } else {
      let imgPrice = 0;
      console.log(
        "this is in the else statement imgPrice should be 0",
        imgPrice
      );
      return imgPrice;
    }
  };

  _getBurnAmount = () => {
    let burnPrice = 0.000032;
    let convertingPrice = new BigNumber(burnPrice);
    let newBurnPrice = convertingPrice.toFixed(18);
    return newBurnPrice;
  };

  _hasImage = transObj => {
    let hercValue = this.state.hercValue;
    if (transObj.images) {
      let imgPrice = ((transObj.images.size / 1024) * 0.00000002) / hercValue;
      return (
        <View style={localStyles.imgContainer}>
          <Text style={localStyles.TransactionReviewTime}>Images</Text>
          <Image
            style={localStyles.thumb}
            source={{ uri: transObj.images.image }}
          />
          <Text style={localStyles.revPropVal}>
            {(transObj.images.size / 1024).toFixed(3)} kb
          </Text>
          <View style={localStyles.feeContainer}>
            <Image style={localStyles.hercPillarIcon} source={fee} />
            <Text style={localStyles.teePrice}>{imgPrice.toFixed(8)}</Text>
          </View>
        </View>
      );
    }
    return <Text style={localStyles.revPropVal}>No Images</Text>;
  };

  _hasDocuments = transObj => {
    if (transObj.documents) {
      let docPrice = 0.000032;
      return (
        <View style={localStyles.docContainer}>
          <Text style={localStyles.TransactionReviewTime}>Documents</Text>
          <Text style={localStyles.text}>{transObj.documents.name}</Text>
          <Text style={localStyles.text}>
            {(transObj.documents.size / 1024).toFixed(3)} kb
          </Text>
          <View style={localStyles.feeContainer}>
            <Image style={localStyles.hercPillarIcon} source={fee} />
            <Text style={localStyles.teePrice}>{docPrice.toFixed(8)}</Text>
          </View>
        </View>
      );
      console.log(
        transInfo.price,
        "transprice plus docprice",
        this.state.docPrice
      );
    }
    return <Text style={localStyles.revPropVal}>No Documents</Text>;
  };

  _hasList = transObj => {
    if (transObj.properties) {
      list = Object.keys(transObj.properties).map((name, idx) => {
        return (
          <View key={idx} style={localStyles.revPropField}>
            <Text style={localStyles.TransactionReviewName}>{name}:</Text>
            <Text style={localStyles.revPropVal}>
              {transObj.properties[name]}
            </Text>
          </View>
        );
      });
      return (
        <View style={localStyles.listContainer}>
          <Text style={localStyles.TransactionReviewTime}>Properties</Text>
          {list}
        </View>
      );
    }
    return <Text style={localStyles.revPropVal}>No Properties</Text>;
  };

  _goToMenu = () => {
    // const { navigate } = this.props.navigate;
    this._changeModalVisibility(false);
    this.props.navigate("MenuOptions");
  };

  render() {
    let trans = store.getState().AssetReducers.trans;
    let transInfo = trans.header;
    // let fctPrice = this.state ? this.state.fctPrice : "";
    let transDat = trans.data;
    console.log(
      transInfo,
      "transinfo in TransactionReviewrender",
      transInfo.price,
      "transdata"
    );
    let locationImage =
      this.props.transInfo.tXLocation === "recipient"
        ? newRecipient
        : newOriginator;
    let list, edit;
    let dTime = transDat.dTime;
    let name = this.props.transInfo.name;
    let transPrice = transInfo.price;

    if (transDat.hasOwnProperty("ediT")) {
      edit = (
        <View style={localStyles.editField}>
          <Text style={localStyles.TransactionReviewTime}>EDI-T-SET:</Text>
          <Text style={localStyles.text}>{transDat.ediT.name}</Text>
          <Text style={localStyles.text}>{transDat.ediT.value}</Text>
        </View>
      );
    }

    /// I'm using a smaller location image locally. localStyles.assetLocationLabel
    return (
      <View style={localStyles.SupplyChainTransactionReviewContainer}>
        <Text style={styles.TransactionReview}>Transaction Review</Text>

        {edit}

        {this._hasImage(transDat)}

        {this._hasDocuments(transDat)}

        {this._hasList(transDat)}

        <TouchableHighlight
          style={{ margin: 10 }}
          onPress={() => this._onPressSubmit(transPrice)}
        >
          <Image source={submit} style={localStyles.submitButton} />
        </TouchableHighlight>
        {/* <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{this._getPrices()}</Text>
                </View> */}
        <Modal
          transparent={false}
          animationType={"none"}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("modal closed");
          }}
        >
          <View style={modalStyle.container}>
            <View style={modalStyle.modalBackground}>
              <View style={modalStyle.closeButtonContainer}>
                <TouchableHighlight
                  style={modalStyle.closeButton}
                  onPress={() => this._changeModalVisibility(false)}
                >
                  <Text style={{ margin: 5, fontSize: 30, color: "#00000070" }}>
                    X
                  </Text>
                </TouchableHighlight>
              </View>
              {!this.props.transDataFlags.confTransComplete && (
                <Text style={modalStyle.wordsText}>
                  Your Transaction Information Is Being Written To The
                  Blockchain
                </Text>
              )}
              <View style={modalStyle.activityIndicatorWrapper}>
                <ActivityIndicator
                  animating={!this.props.transDataFlags.confTransComplete}
                  size="large"
                  color="#091141"
                />
              </View>

              {this.props.transDataFlags.confTransComplete && (
                <View>
                  <Text style={modalStyle.wordsText}>
                    Your Transaction Has Completed!
                  </Text>
                  <TouchableHighlight
                    style={modalStyle.modalButton}
                    onPress={() => this._goToMenu()}
                  >
                    <Text style={{ margin: 5 }}>Back to Menu</Text>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  SupplyChainTransactionReviewContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  submitButton: {
    height: 40,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center"
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
    height: 100
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
    margin: 10
  },
  editLabel: {
    fontFamily: "dinPro",
    fontSize: 21,
    color: "yellow",
    margin: 2,
    alignSelf: "center"
  },
  TransactionReviewTime: {
    color: "#f3c736",
    fontFamily: "dinPro",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "column"
  },
  TransactionReviewName: {
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
    margin: 5
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

const mapStateToProps = state => ({
  transInfo: state.AssetReducers.trans.header,
  transDat: state.AssetReducers.trans.data,
  transDataFlags: state.AssetReducers.transDataFlags,
  wallet: state.WalletActReducers.wallet,
  watchBalance: state.WalletActReducers.watchBalance
  // price: state.dataReducer.prices.list.pricePerHercForFCT
});

const mapDispatchToProps = dispatch => ({
  sendTrans: transPrice => dispatch(sendTrans(transPrice))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplyChainTransactionReview);
