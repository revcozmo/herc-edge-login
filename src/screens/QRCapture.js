import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, TouchableHighlight } from "react-native";
// import { ConstanSts, BarCodeScanner, Permissions } from "expo";
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';
import { Button } from "react-native";
import { connect } from "react-redux";
import { getQRData } from "../actions/AssetActions";

//to test QR functionality without a camera do the following:
// * comment out lines 40, and 78 - 87
// * uncomment lines 42-53, and 88-95

class QRCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Camera Permission',
          'message': 'HERC needs access to your camera '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ hasCameraPermission: true })
      } else {
        this.setState({ hasCameraPermission: false })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  handleQRForward = () => {
    const passStateToRedux = this.props.getQRData(this.state);
    const { navigate } = this.props.navigation;
    navigate("NewAssetForm");
  };

  _handleBarCodeRead = (data) => {
    console.log(data)
    const scanResult = data.data;
    const splitScanResult = scanResult.split(", ");
    console.log(splitScanResult)

    // const splitScanResult = [
    //   "Assay",
    //   "Bar Serial",
    //   "Bar ID",
    //   "Date Processed",
    //   "Mint",
    //   "Supplier",
    //   "Vault Location",
    //   "Weight"
    // ];

    // "https://firebasestorage.googleapis.com/v0/b/hercone-8025f.appspot.com/o/AG_logo.png?alt=media&token=756e5e75-7c07-4f5c-91a7-d72ce1c0b9ed",


    this.setState(
      {
          metric1: splitScanResult[0],
          metric2: splitScanResult[1],
          metric3: splitScanResult[2],
          metric4: splitScanResult[3],
          metric5: splitScanResult[4],
          metric6: splitScanResult[5],
          metric7: splitScanResult[6],
          metric8: splitScanResult[7]
      },
      () => this.handleQRForward()
    );
  };

  renderCamera() {
    return (
      <RNCamera
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        // flashMode={RNCamera.ConstantMode.on}
        style={styles.preview}
        onBarCodeRead={(bar) => this._handleBarCodeRead(bar)}
        ref={cam => (this.camera = cam)}
        style={styles.preview}
        flashMode={RNCamera.Constants.FlashMode.off}
        // permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}>
      </RNCamera>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
              this.renderCamera()
            )}
        {/* <Button
          onPress={() => {
            this._handleBarCodeRead();
          }}
          title="click to simulate scan"
          color="#841584"
          accessibilityLabel="click to simulate scan"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 400,
    width: 400
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: -5,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  accept: {
    margin: 10,
    top: -5,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  getQRData: data => dispatch(getQRData(data))
});

export default connect(
  null,
  mapDispatchToProps
)(QRCapture);
