import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
  }

  // _getPic = (data) => {
  //   console.log(data.uri);
  //   this.setState({path: data.uri})
  //   navigate
  // }
  takePicture = async () => {
    const { params } = this.props.navigation.state;
    if (this.camera) {
      const options = { base64: true }
      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({ path: data.uri });
        params.setLogo(data.base64);
        console.log("afterBase");

        // this.props.updateImage(data.uri);
        // console.log('Path to image: ' + data.uri);
      } catch (err) {
        console.log('err: ', err);
      }
    };
  }

  renderCamera() {
    return (
      <RNCamera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}

      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
          </Text>
      </View>
    );
  }

  render() {
    console.log(this.state, "thisStatein Render")
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}




// render() {
//   const { params } = this.props.navigation.state;
//   return (
//     <View style={styles.container}>
//       <RNCamera
//         ref={ref => {
//           this.camera = ref;
//         }}
//         style={styles.preview}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.on}
//         permissionDialogTitle={'Permission to use camera'}
//         permissionDialogMessage={'We need your permission to use your camera phone'}
//       />
//       <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
//         <TouchableOpacity
//           onPress={this.takePicture}
//           style={styles.capture}
//         >
//           <Text style={{ fontSize: 14 }}> SNAP </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// takePicture = async function () {
//   console.log("snap was pressed");
//   console.log(this.camera);
//   try {
//     const data = await this.camera.takePictureAsync();
//     this.setState({ path: data.uri });
//     // this.props.updateImage(data.uri);
//     // console.log('Path to image: ' + data.uri);
//   } catch (err) {
//     console.log('err: ', err);
//   }
// };
//   };


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
    height: Dimensions.get('window').height - 50,
    width: Dimensions.get('window').width
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
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});