import React from 'react';
import { connect } from "react-redux";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  CameraRoll,
  PixelRatio,
  TouchableHighlight,
  Clipboard,
  Alert,
  Share
} from 'react-native';
// import { WebBrowser } from 'expo';
// import { DocumentPicker, ImagePicker, takeSnapshotAsync } from 'expo';
import firebase from 'firebase';
import Firebase from '../constants/Firebase';
import hercLogo from '../assets/hercLogoBreak.png';
import { __await } from 'tslib';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
var RNFS = require('react-native-fs');
import QRCode from 'react-qr-code';
import styles from '../assets/styles';
import { RNCamera } from "react-native-camera";

console.disableYellowBox = true;

class DocumentStorage extends React.Component {

  state = {
    hasCameraRollPermission: null,
    uri: "",
    name: "",
    size: "",
    type: "",
    content: "",
    uploadDoc: null
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
        flexDirection: 'row'
      },
      header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,
      },
      header__image__box: {
        height: "100%",
        borderRadius: 100
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
      },
    })

    return {
      headerTitle: (
        <View style={headerStyles.header__container}>
          <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
            <View style={headerStyles.header__container__centeredBox}>
              <View style={headerStyles.header__image__box}>
                {/* <Image
                      style={headerStyles.assetHeaderLogo}
                      source={{ uri: params.logo }}
                    /> */}
              </View>
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
    console.log(this.props.account.username, "this is the props in document storage")
  }

  _writeToClipboard = async (data) => {
    await Clipboard.setString(data);
    Alert.alert('Copied to Clipboard!', data);
  };



  //   async componentDidMount() {
  //     // await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     // await Permissions.askAsync(Permissions.CAMERA);
  //   }

  //   _requestCameraRollPermission = async () => {

  //     const { Permissions } = Expo;
  //     const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

  //     // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     this.setState({
  //       hasCameraRollPermission: status === "granted"
  //     });
  //   };

  _pickDocument = () => {
    this.setState({ uploadDoc: true })
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      //this if(res) allows user to use native android back button to exit docpicker
      if (res) {
        if (error) Alert.alert("Something Went Wrong! Error: " + error);
        // Android
        RNFS.readFile(res.uri, 'base64')
          .then(contents => {
            this.setState({
              uri: res.uri,
              name: res.fileName,
              size: res.fileSize,
              type: res.type,
              content: contents
            }, () => console.log(this.state));
          })
      }
    });
  }

  //   _contents = (cont) => {
  //     this.setState({ contents: cont });
  //   }

  // _setDetails = () => {
  //   if (this.state.document) {
  //     let docSizeBytes = this.state.document.size;
  //     let docSizeKilobytes = docSizeBytes * .001;
  //     let docSizeKB2Decimals = docSizeKilobytes.toFixed(2);
  //     this.setState({ docSizekb: docSizeKB2Decimals });
  //     // let calculatedCost = (docSizeKB2Decimals * .001) / .4;
  //     let calculatedCost2Fixed =  .00008;
  //     this.setState({ cost: calculatedCost2Fixed })
  //   }
  // }
  //   _pickImage = async () => {
  //     const Blob = RNFetchBlob.polyfill.Blob;
  //     const fs = RNFetchBlob.fs;
  //     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  //     window.Blob = Blob;

  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });
  //     alert("file path: ", result.uri);
  //     if (!result.cancelled) {
  //       this.setState({ image: result.uri });
  //     }
  //   };

  _executeUpload = async () => {
    let f = this.state.uri;
    uploadURL = await this._uploadFile(f);
  }

  _share = async () => {
    const downloadUrl = this.state.downloadURL;
    Share.share({
      message: 'this is a link to the file ' + downloadUrl,
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    }, {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }

  _uploadFile = async (uri) => {
    let docName = this.state.name;
    let storageRef = firebase.storage().ref();
    let testTextRef = storageRef.child(docName);
    let testTextDocRef = storageRef.child('documents/' + docName);
    var bindedThis = this;

    //****this is where the file needs to be converted and push to storage */
    const response = await fetch(uri);
    const blob = await response.blob();
    const snapshot = await testTextDocRef.put(blob).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      console.log(`Successfully uploaded file and got download link` + downloadURL);
      bindedThis.setState({ downloadURL }, () => this._updateHistory())
      // return downloadURL;
    }).catch(error => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
    });
  }

  _scanQR = () => {
    console.log("scanning QR");
    this.setState({ uploadDoc: false })
  }

  _openCameraView = () => {
    return (
      <View style={localStyles.container}>
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={localStyles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
        >
        </RNCamera>
      </View>)
  }

  _updateHistory = () => {
    let filename = this.state.name;
    let userID = this.props.account.username;
    let downloadURL = this.state.downloadURL;
    var dt = new Date();
    var utcDate = dt.toUTCString();
    var starCountRef = firebase.database().ref('documents/' + userID).push().set({
      downloadURL: downloadURL,
      filename: filename,
      date: utcDate
    })
  }

  _takePic = () => {
    const { navigate } = this.props.navigation;
    console.log("FileUp Camera: takingpic")
    navigate('DocumentQRScanner', { setPic: this.setImage })
  }

  _onBarCodeRead = e => {
    this.setState({ qrcode: e.data });
  };

  //   _updateWallet = () => {
  //     let currentWallet = this.state.wallet;
  //     let currentPrice = this.state.cost;
  //     let newWallet = currentWallet - currentPrice;
  //     this.setState({ wallet: newWallet })
  //   }

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
    // let { image } = this.state;

    return (
      <View
        style={styles.container}
      >
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>

          <TouchableHighlight onPress={() => this._pickDocument()}>
            <Text style={{ color: "white", backgroundColor: "#4c99ed", width: 200, lineHeight: 30, height: 30, borderRadius: 5, textAlign: "center", justifyContent: "center", alignContent: "center" }}>
              Select Document
            </Text>
          </TouchableHighlight>

          {this.state.name ? <Text style={{ color: "silver", flexWrap: 'wrap' }}> file name: {this.state.name} </Text> : null}
          {this.state.size ? <Text style={{ color: "silver", flexWrap: 'wrap' }}> file size: {this.state.size} kB </Text> : null}
          {/* {this.state.cost ? <Text> upload cost: {this.state.cost} Hercs </Text> : null} */}

          {this.state.name ?
            <TouchableHighlight onPress={this._executeUpload}>
              <Text style={{ color: "white", marginTop: 10, backgroundColor: "#4c99ed", width: 200, lineHeight: 30, height: 30, borderRadius: 5, textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                Upload
              </Text>
            </TouchableHighlight>
            : null}

          <View style={{ alignContent: "center", alignItems: "center" }}>
            <View style={{ padding: 10, flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center" }} collapsable={false} ref={view => {
              this._container = view;
            }}>

              {this.state.downloadURL ? <QRCode size={140} value={this.state.downloadURL} /> : null}

              {this.state.downloadURL ? <Text style={{ color: "silver", flexWrap: 'wrap', textAlign: "center" }}> {this.state.downloadURL} </Text> : null}
            </View>

            {/* {this.state.downloadURL ? <Button title="Save QR" onPress={this._saveToCameraRollAsync} /> : null} */}

            {this.state.downloadURL ?
              <View>
                <TouchableHighlight onPress={() => { this._writeToClipboard(this.state.downloadURL) }}>
                  <Text style={{ color: "white", marginTop: 10, backgroundColor: "#4c99ed", width: 200, lineHeight: 30, height: 30, borderRadius: 5, textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                    Copy
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this._share() }}>
                  <Text style={{ color: "white", marginTop: 10, backgroundColor: "#4c99ed", width: 200, lineHeight: 30, height: 30, borderRadius: 5, textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                    share
                  </Text>
                </TouchableHighlight>
              </View> : null}
          </View>

          {this.state.uploadDoc === true ? null :
            <View style={{ alignContent: "center" }}>
              <Text style={{ color: "white", textAlign: "center" }}>OR</Text>
              <TouchableHighlight style={{ marginTop: 10, marginBottom: 10 }} onPress={() => this._takePic()}>
                <Text style={{ color: "white", backgroundColor: "#4c99ed", width: 200, lineHeight: 30, height: 30, borderRadius: 5, textAlign: "center", justifyContent: "center", alignContent: "center" }}>
                  Scan A QR
                </Text>
              </TouchableHighlight>
            </View>
          }

          {/* {this.state.uploadDoc === false ? this._openCameraView() : null} */}

          {/* <TouchableHighlight onPress={() => this._takePic()}>
            <Image style={styles.menuButton} source={takePhoto} />
          </TouchableHighlight> */}

          <View style={{ width: "100%", flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "flex-end" }}>
            {/* <View style={{ flexDirection: "row", alignContent: "flex-end", margin: 2 }}>
            <Text style={{ fontSize: 12, color: "black", margin: 1, marginBottom: "10%", alignSelf: "center" }}>Wallet: {this.state.wallet} Hercs
            </Text>
          </View> */}


            <View style={{ flexDirection: "column", margin: 2, width: "100%" }}>
              {/* <Text style={{ fontSize: 12, color: "silver"}}>Secured by</Text> */}
              <Image source={hercLogo} style={{ resizeMode: "center", height: 50, width: "50%", alignSelf: "center" }} />
            </View>
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
    // height: 400,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center"
  }
});


const mapStateToProps = state => ({
  account: state.WalletActReducers.account
})

export default connect(mapStateToProps, null)(DocumentStorage);