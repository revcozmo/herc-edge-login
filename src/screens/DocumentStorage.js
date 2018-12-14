import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  PixelRatio,
  TouchableHighlight,
  Clipboard,
  Alert,
  Share,
  ActivityIndicator
} from "react-native";
// import { WebBrowser } from 'expo';
// import { DocumentPicker, ImagePicker, takeSnapshotAsync } from 'expo';
import firebase from "firebase";
import Firebase from "../constants/Firebase";
import hercLogo from "../assets/hercLogoBreak.png";
import { __await } from "tslib";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
var RNFS = require("react-native-fs");
import QRCode from "react-qr-code";
import styles from "../assets/styles";
import { RNCamera } from "react-native-camera";
import axios from "axios";
import { WEB_SERVER_API_SHORTEN_URL } from "../components/settings";
import store from "../store";
import { sendTrans } from "../actions/AssetActions";
import BigNumber from "bignumber.js";
console.disableYellowBox = true;

class DocumentStorage extends React.Component {
  state = {
    hasCameraRollPermission: null,
    uri: "",
    name: "",
    size: "",
    type: "",
    content: "",
    uploadDoc: null,
    uploadHistory: [],
    showLoader: true
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let headerStyles = StyleSheet.create({
      header__container: {
        display: "flex",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20
      },
      header__container__centeredBox: {
        height: "100%",
        alignItems: "center",
        flexDirection: "row"
      },
      header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12
      },
      header__image__box: {
        height: "100%",
        borderRadius: 100
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2
      }
    });

    return {
      headerTitle: (
        <View style={headerStyles.header__container}>
          <TouchableHighlight
            style={{ justifyContent: "center" }}
            onPress={() => navigation.navigate("MenuOptions")}
          >
            <View style={headerStyles.header__container__centeredBox}>
              <View style={headerStyles.header__image__box} />
              <View style={headerStyles.header__text__box}>
                <Text style={headerStyles.headerText}>Document Storage</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      ),
      headerTitleStyle: {
        height: 50,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 20
      }
    };
  };

  componentDidMount() {
    console.log(this.props, "***props***");
    console.log(store, "store****");
    this._mapUploadHistory();

    try {
      let balance = new BigNumber(this.props.watchBalance["HERC"]);
      this.setState({ balance: balance.times(1e-18).toFixed(6) });
    } catch (e) {
      let balance = new BigNumber(this.props.wallet.balances["HERC"]);
      this.setState({ balance: balance.times(1e-18).toFixed(6) });
    }
  }

  _writeToClipboard = async data => {
    await Clipboard.setString(data);
    Alert.alert("Copied to Clipboard!", data);
  };

  _pickDocument = () => {
    this.setState({ uploadDoc: true });
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        //this if(res) allows user to use native android back button to exit docpicker
        if (res) {
          if (error) Alert.alert("Something Went Wrong! Error: " + error);
          // Android
          RNFS.readFile(res.uri, "base64").then(contents => {
            this.setState(
              {
                uri: res.uri,
                name: res.fileName,
                size: res.fileSize,
                type: res.type,
                content: contents
              },
              () => this._onSubmit()
            );
          });
        }
      }
    );
  };

  _executeUpload = async () => {
    let f = this.state.uri;
    uploadURL = await this._uploadFile(f);
  };

  _share = async () => {
    const downloadUrl = this.state.downloadURL;
    Share.share(
      {
        message: "Herc Document Storage Link: " + downloadUrl,
        url: downloadUrl,
        title: "Herc Document Storage Link"
      },
      {
        // Android only:
        dialogTitle: "Herc Document Storage Link",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
  };

  _uploadFile = async uri => {
    let docName = this.state.name;
    let storageRef = firebase.storage().ref();
    let testTextRef = storageRef.child(docName);
    let testTextDocRef = storageRef.child("documents/" + docName);
    var bindedThis = this;

    //****this is where the file needs to be converted and push to storage */
    const response = await fetch(uri);
    const blob = await response.blob();
    let shortenedURL;
    const snapshot = await testTextDocRef
      .put(blob)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        axios
          .post(WEB_SERVER_API_SHORTEN_URL, {
            longURL: downloadURL
          })
          .then(response => {
            let shortenedURL = response.data.url;
            bindedThis.setState({ downloadURL: shortenedURL }, () =>
              this._updateHistory()
            );
          });
      })
      .catch(error => {
        // Use to signal error if something goes wrong.
        console.log(`Failed to upload file and get link - ${error}`);
      });
  };

  _scanQR = () => {
    this.setState({ uploadDoc: false });
  };

  _openCameraView = () => {
    return (
      <View style={localStyles.container}>
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={localStyles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
        />
      </View>
    );
  };

  _mapUploadHistory = name => {
    let userID = this.props.account.username;
    database = firebase.database();
    var ref = database.ref("documents/" + userID);

    errData = err => {
      console.log("Error!", err);
    };

    gotData = data => {
      this.setState(
        {
          uploadHistory: data.val()
        },
        () => console.log(this.state)
      );
    };

    ref.on("value", gotData, errData);
  };

  _updateHistory = () => {
    let filename = this.state.name;
    let userID = this.props.account.username;
    let downloadURL = this.state.downloadURL;
    var dt = new Date();
    var utcDate = dt.toUTCString();
    var starCountRef = firebase
      .database()
      .ref("documents/" + userID)
      .push()
      .set({
        downloadURL: downloadURL,
        filename: filename,
        date: utcDate
      });
  };

  _takePic = () => {
    const { navigate } = this.props.navigation;
    console.log("FileUp Camera: takingpic");
    navigate("DocumentQRScanner", { setPic: this.setImage });
  };

  _onBarCodeRead = e => {
    this.setState({ qrcode: e.data });
  };

  _showUploadHistory = () => {
    const uploadHist = this.state.uploadHistory;
    if (uploadHist) {
      let dataObjects = Object.keys(this.state.uploadHistory);
      return dataObjects.map((curr, ind) => {
        const dataObjectKeys = this.state.uploadHistory;
        const date = dataObjectKeys[curr].date;
        const filename = dataObjectKeys[curr].filename;
        const downloadURL = dataObjectKeys[curr].downloadURL;
        return (
          <View key={dataObjectKeys[curr]}>
            <Text style={{ color: "white" }}>{date}</Text>
            <Text style={{ color: "white" }}>{filename}</Text>
            <TouchableHighlight
              onPress={() => {
                this._writeToClipboard(downloadURL);
              }}
            >
              <Text
                style={{
                  color: "white",
                  margin: 10,
                  backgroundColor: "#4c99ed",
                  width: 200,
                  lineHeight: 30,
                  height: 30,
                  borderRadius: 5,
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                {" "}
                Copy Link
              </Text>
            </TouchableHighlight>
          </View>
        );
      });
    }
  };

  _activityIdicatorOrQRCode = () => {
    const runLoaderChange = () => {
      this.setState({ showLoader: false });
    };

    setTimeout(runLoaderChange, 2 * 1000);

    if (this.state.showLoader != true) {
      return <QRCode size={140} value={this.state.downloadURL} />;
    } else {
      return (
        <View
          style={{
            height: 140,
            width: 140,
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };

  //under here is copied from supply chain transaction review

  _onPressSubmit() {
    if (Object.keys(this.props.transDat).length > 0) {
      let total = parseFloat(this._getPrices()) + 0.000032;
      Alert.alert(
        "Data Fee: " +
          this._getPrices().toString() +
          " HERC \nBurn Amount: 0.000032 HERC",
        "Total: " + total + " HERC \nDo you authorize this payment?",
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

    let dataFee = new BigNumber(this._getPrices());

    let total = parseFloat(this._getPrices()) + 0.000032;
    let convertingPrice = new BigNumber(total); // don't have to times 1e18 because its already hercs
    let balance = new BigNumber(this.state.balance);

    let newbalance = balance.minus(convertingPrice);

    console.log("do you have enough?", newbalance.isPositive());

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
            nativeAmount: "0.000032"
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

  // _sendTrans() {
  //   this.props.sendTrans(this._getPrices());
  // }

  // _getPrices = () => {
  //   let transDat = this.props.transDat;
  //   let price = 0;
  //   let imgPrice = 0;
  //   let docPrice = 0;

  //   // if (transDat.images) {
  //   //     imgPrice = ((transDat.images.size / 1024) * .00000002) / .4
  //   // };

  //   if (transDat.documents) {
  //     docPrice = 0.000032;
  //   }

  //   price = docPrice + imgPrice + 0.000032;
  //   console.log(docPrice, imgPrice, price, "chance price check");

  //   let convertingPrice = new BigNumber(price);
  //   let newPrice = convertingPrice.toFixed(6);

  //   return newPrice;
  // };

  // _hasDocuments = transObj => {
  //   if (transObj.documents) {
  //     let docPrice = 0.000032;
  //     return (
  //       <View style={localStyles.docContainer}>
  //         <Text style={localStyles.TransactionReviewTime}>Documents</Text>
  //         <Text style={localStyles.text}>{transObj.documents.name}</Text>
  //         <Text style={localStyles.text}>
  //           {(transObj.documents.size / 1024).toFixed(3)} kb
  //         </Text>
  //         <View style={localStyles.feeContainer}>
  //           <Image style={localStyles.hercPillarIcon} source={fee} />
  //           <Text style={localStyles.teePrice}>{docPrice.toFixed(6)}</Text>
  //         </View>
  //       </View>
  //     );
  //     console.log(
  //       transInfo.price,
  //       "transprice plus docprice",
  //       this.state.docPrice
  //     );
  //   }
  //   return <Text style={localStyles.revPropVal}>No Documents</Text>;
  // };

  _onSubmit = () => {
    const { navigate } = this.props.navigation;
    let uri = this.state.uri;
    let docName = this.state.name;
    let docSize = this.state.size;
    let docContent = this.state.content;
    let doc = Object.assign({}, this.state, {
      uri: uri,
      size: docSize,
      name: docName,
      content: docContent
    })

    this.props.addDoc(doc);

    // navigate('SupplyChainReview', { logo: this.props.logo, name: this.props.name });
  };



  //   _saveToCameraRollAsync = async () => {
  //     const targetPixelCount = 1080; // If you want full HD pictures
  //     const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
  //     // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
  //     const pixels = targetPixelCount / pixelRatio;
  //     const result = await takeSnapshotAsync(this._container, {
  //       result: 'file',
  //       height: 120,
  //       width: 120,
  //       quality: 1,
  //       format: 'jpg',
  //     });

  //     let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
  //     this.setState({ cameraRollUri: saveResult }, alert("saved to " + saveResult));
  //   };

  render() {
    // let trans = store.getState().AssetReducers.trans;
    // console.log(trans, "***trans***");
    // let transInfo = trans.header;
    // let fctPrice = this.state ? this.state.fctPrice : "";
    // let transDat = trans.data;
    // console.log(transInfo, 'transinfo in TransactionReviewrender', transInfo.price, 'transdata')
    // let locationImage = this.props.transInfo.tXLocation === 'recipient' ? newRecipient : newOriginator;
    let list, edit;
    // let dTime = transDat.dTime;
    // let name = this.props.transInfo.name;
    // let transPrice = transInfo.price;

    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { flex: 1 }]}>
          <TouchableHighlight
            style={{ marginTop: 10 }}
            onPress={() => this._pickDocument()}
          >
            <Text
              style={{
                color: "white",
                backgroundColor: "#4c99ed",
                width: 200,
                lineHeight: 30,
                height: 30,
                borderRadius: 5,
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              Select Document
            </Text>
          </TouchableHighlight>

          {this.state.name ? (
            <Text style={{ color: "silver", flexWrap: "wrap" }}>
              {" "}
              file name: {this.state.name}{" "}
            </Text>
          ) : null}
          {this.state.size ? (
            <View>
              <Text style={{ color: "silver", flexWrap: "wrap" }}>
                {" "}
                file size: {this.state.size} kB{" "}
              </Text>{" "}
              {this._hasDocuments(transDat)}{" "}
            </View>
          ) : null}
          {/* {this.state.cost ? <Text> upload cost: {this.state.cost} Hercs </Text> : null} */}

          {this.state.name ? (
            <TouchableHighlight onPress={() => this._onPressSubmit(transPrice)}>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  backgroundColor: "#4c99ed",
                  width: 200,
                  lineHeight: 30,
                  height: 30,
                  borderRadius: 5,
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                Upload
              </Text>
            </TouchableHighlight>
          ) : null}

          <View style={{ alignContent: "center", alignItems: "center" }}>
            <View
              style={{
                padding: 10,
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
              collapsable={false}
              ref={view => {
                this._container = view;
              }}
            >
              {this.state.downloadURL ? (
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 10,
                    borderColor: "white"
                  }}
                >
                  {this._activityIdicatorOrQRCode()}
                </View>
              ) : null}

              {this.state.downloadURL ? (
                <Text
                  style={{
                    color: "silver",
                    flexWrap: "wrap",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  {this.state.downloadURL}{" "}
                </Text>
              ) : null}
            </View>

            {/* {this.state.downloadURL ? <Button title="Save QR" onPress={this._saveToCameraRollAsync} /> : null} */}

            {this.state.downloadURL ? (
              <View>
                <TouchableHighlight
                  onPress={() => {
                    this._writeToClipboard(this.state.downloadURL);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      marginTop: 10,
                      backgroundColor: "#4c99ed",
                      width: 200,
                      lineHeight: 30,
                      height: 30,
                      borderRadius: 5,
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    Copy
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this._share();
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      marginTop: 10,
                      backgroundColor: "#4c99ed",
                      width: 200,
                      lineHeight: 30,
                      height: 30,
                      borderRadius: 5,
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    share
                  </Text>
                </TouchableHighlight>
              </View>
            ) : null}
          </View>

          {this.state.uploadDoc === true ? null : (
            <View style={{ alignContent: "center" }}>
              <Text style={{ color: "white", textAlign: "center" }}>OR</Text>
              <TouchableHighlight
                style={{ marginTop: 10, marginBottom: 10 }}
                onPress={() => this._takePic()}
              >
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "#4c99ed",
                    width: 200,
                    lineHeight: 30,
                    height: 30,
                    borderRadius: 5,
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  Scan A QR
                </Text>
              </TouchableHighlight>
            </View>
          )}

          {this.state.uploadDoc === true ? null : (
            <ScrollView style={{ height: "50%" }}>
              <View style={{ marginTop: "20%", alignItems: "center" }}>
                {this.state.uploadHistory ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center",
                      marginVertical: 10
                    }}
                  >
                    HISTORY
                  </Text>
                ) : null}
                {this._showUploadHistory()}
              </View>
            </ScrollView>
          )}
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              margin: 2,
              width: "100%",
              justifyContent: "flex-end",
              backgroundColor: "#091141"
            }}
          >
            <Image
              source={hercLogo}
              style={{
                resizeMode: "center",
                height: 50,
                width: "50%",
                alignSelf: "center"
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 3,
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1
  },
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
  // transHeader: state.AssetReducers.trans.header || {},
  // transInfo: state.AssetReducers.trans.header,
  // transDat: state.AssetReducers.trans,
  // transDataFlags: state.AssetReducers.transDataFlags,
  wallet: state.WalletActReducers.wallet,
  watchBalance: state.WalletActReducers.watchBalance,
  account: state.WalletActReducers.account
});

const mapDispatchToProps = dispatch => ({
  addDoc: doc => dispatch(addDoc(doc)),
  sendTrans: transPrice => dispatch(sendTrans(transPrice))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentStorage);
