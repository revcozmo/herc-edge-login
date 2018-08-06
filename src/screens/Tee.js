import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Alert
} from "react-native";

import { RNCamera } from 'react-native-camera';
import { connect } from "react-redux";
import styles from "../assets/styles";
import Button from "react-native-button";
import logo from "../assets/round.png";
import { addAsset, getHercId } from "../actions/AssetActions";
// import { FileSystem, Camera, Permissions, ImagePicker } from "expo";
import next from "../components/buttons/nextButton.png";
import takePhoto from "../components/buttons/takePhoto.png";
import uploadPhoto from "../components/buttons/uploadImage.png";

import { STATUS_BAR_HEIGHT } from "../constants";

//// Need to replace the camera functionality


class Tee extends Component {
  static navigationOptions = ({ navigation }) => {

    let headerStyles = StyleSheet.create({
      header__container: {
        // borderColor: "green",
        // borderWidth: 3,
        display: "flex",
        // resizeMode: "contain",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20

      },
      header__container__centeredBox: {
        // borderColor: "purple",
        // borderWidth: 3,
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
      },
      header__text__box: {
        // borderColor: "blue",
        // borderWidth: 3,
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,

      },
      header__image__box: {
        // borderColor: "yellow",
        // borderWidth: 3,
        height: "100%",
        borderRadius: 100
        // width: 50
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
        // resizeMode: "contain",
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
        // paddingTop: 5
      },
    })
    return {
      headerTitle: (

        <View style={headerStyles.header__container}>
          <View style={headerStyles.header__container__centeredBox}>
            <View style={headerStyles.header__image__box}>
              <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
                <Image
                  style={headerStyles.assetHeaderLogo}
                  source={logo}
                />
              </TouchableHighlight>
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Register</Text>
            </View>
          </View>
        </View>

      )
    }
  }


  constructor(props) {
    super(props);
    
    this.setLogo = this.setLogo.bind(this); // method to set the log from the camera component 
    
    this.state = {
      Logo: null,
    };
  }

  componentDidMount() {
  }

  setLogo = (imgObj) => {
    console.log("trying to set the Logog", imgObj)
    this.setState({
      Logo: imgObj.string
    })

  }

  _takePic = () => {
    const { navigate } = this.props.navigation;
    console.log("takingpic")
    navigate('Camera',{ setPic: this.setLogo})

  }
  _pickImage = () => {
  }
  // _pickImage = async () => {
  //   let logo = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: false,
  //     aspect: [4, 4],
  //     base64: true
  //   });
  //   alert(logo.uri);

  //   console.log(logo.uri, "logouri");

  //   if (!logo.cancelled) {
  //     this.setState({
  //       Logo: "data:image/png;base64," + logo.base64
  //     });
  //     console.log("image in state");
  //   }
  // };

  


  _onSubmit = () => {
    const { navigate } = this.props.navigation;


    if (!this.state.Name) {
      Alert.alert("Please Add A Name");
    }

    if (this.state.CoreProps) {
      let CoreProps = {};
      Object.values(this.state.CoreProps).map(x => {
        CoreProps[x] = "";
      });

      let newAsset = Object.assign({}, {
        ...this.state,
        CoreProps
      });

      if (this.state.Name && this.state.CoreProps) {
        this.props.addAsset(newAsset);
        navigate("NewAssetConfirm");
      }
    } else {
      Alert.alert("No Properties");

    }

  }

  render() {
    let Logo = this.state.Logo || null;

    if(this.state.Logo){
      console.log("logog is here")
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <View style={{ flexDirection: 'row', marginBottom: 10, width: '90%', justifyContent: 'center' }}>
            <Text style={localStyles.wordsText}>Enter New </Text>
            <Text style={localStyles.yellowText}>IGVC</Text>
            <Text style={localStyles.wordsText}> Params!</Text>
          </View>
          <ScrollView style={{ alignSelf: "center", width: "100%", paddingRight: 7 }}>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Asset Name</Text>
              <TextInput
                autoCorrect={false}
                spellCheck={false}
                underlineColorAndroid='transparent'
                style={localStyles.input}
                onChangeText={Name => this.setState({ Name })}
                // underlineColorAndroid="transparent"
                placeholder="Asset Name"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Asset URL</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={Url => this.setState({ Url })}
                placeholder="URL"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 1</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric1 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric1 }
                  })
                }
                placeholder="metric1"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 2</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric2 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric2 }
                  })
                }
                placeholder="metric2"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 3</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric3 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric3 }
                  })
                }
                placeholder="metric3"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 4</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric4 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric4 }
                  })
                }
                placeholder="metric4"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 5</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric5 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric5 }
                  })
                }
                placeholder="metric5"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 6</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric6 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric6 }
                  })
                }
                placeholder="metric6"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 7</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric7 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric7 }
                  })
                }
                placeholder="metric7"
              />
            </View>
            <View style={localStyles.assetMetricInputField}>
              <Text style={localStyles.text}>Metric 8</Text>
              <TextInput
                style={localStyles.input}
                onChangeText={metric8 =>
                  this.setState({
                    CoreProps: { ...this.state.CoreProps, metric8 }
                  })
                }
                placeholder="metric8"
              />
            </View>


            {Logo && (
              <Image
                source={{ uri: Logo }}
                style={{
                  width: 100,
                  height: 100,
                  margin: 10,
                  alignSelf: "center"
                }}
              />
            )}

            <View style={localStyles.imageButtonContainer}>
              <TouchableHighlight onPress={this._takePic}>
                <Image style={styles.menuButton} source={takePhoto} />
              </TouchableHighlight>
              
              <TouchableHighlight onPress={() => this._pickImage()}>
                <Image style={styles.menuButton} source={uploadPhoto} />
              </TouchableHighlight>
            </View>
          </ScrollView>

          <TouchableHighlight onPress={() => this._onSubmit()}>
            <Image style={localStyles.nextButtonContainer} source={next} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // newAsset: state.AssetReducers.newAsset,
  hercId: state.AssetReducers.hercId
  // newProperties: state.AssetReducers.selectedAsset.newProperties
});
const mapDispatchToProps = dispatch => ({
  addAsset: newAsset => dispatch(addAsset(newAsset)),
  getHercId: () => dispatch(getHercId())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tee);

const localStyles = StyleSheet.create({


  assetMetricInputField: {
    height: 40,
    flexDirection: "row",
    width: "100%",
    borderColor: "blue",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 10

  },
  text: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
  input: {
    width: "53%",
    height: 36,
    textAlign: "center",
    backgroundColor: "#ffffff",

    // margin: .5,
    fontSize: 15,
    fontWeight: "200",
    borderColor: "blue",
    color: "black",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 3
  },

  nextButtonContainer: {
    height: 40,
    width: 150,
    margin: 10,
    resizeMode: "contain"

  },
  imageButtonContainer: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    // backgroundColor: 'blue',
    alignItems: "center"
  },
  wordsText: {
    height: 23,
    fontSize: 20,
    fontWeight: "600",
    color: "white"
  },
  yellowText: {
    height: 23,
    fontSize: 20,
    fontWeight: "600",
    color: "yellow"
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }


})
