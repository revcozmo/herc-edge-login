import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,

    Image,
} from 'react-native';
const loadingGif = require("../assets/icons/liquid_preloader_by_volorf.gif");
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import modalStyles from "../assets/modals/ModalStyles";
// import styles from "../assets/styles";
import ColorConstants from "../assets/ColorConstants";
import React, { Component } from 'react';

import { RegisterAssetPassword, HercTextInput, HercTextInputWithLabel, AddPhotoButton, AddMetricButton, RegisterButton } from "../components/RegisterAssetComponents/RegisterAssetInputs";
import Header from "../components/Headers/Header"
import { AssetCard } from "../components/AssetCard";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';

const HercLogo = require('../assets/hLogo.png');
export default class ComponentTest extends Component {
debugger;
    static navigationOptions = {

        header: <Header headerTitle="Register Asset" />
    }

    constructor(props) {
        super(props);
        console.log("componentTest")
        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            CoreProps: {
                Metric1: "",
                Metric2: "",
                Metric3: "",
                Metric4: "",
                Metric5: "",
                Metric6: "",
               
            }
        }
        this.localOnChange = this.localOnChange.bind(this);
        this.pwChange = this.pwChange.bind(this);
    }

    renderInputs = () => {
        let coreProps = this.state.CoreProps;
        let metrics = Object.keys(coreProps);
        let metricInputs = [];
        metrics.forEach((x) => {
            // let name = x

            metricInputs.push(<HercTextInput
                key={x}
                name={x}
                placeholder={x}
                localOnChange={this.localOnChange}
            />
            )
        })
        console.log(metricInputs);
        return metricInputs;
    }

    onPressTest = () => {

        console.log("I got Pressed!")
    }

    changeModal1 = () => {
        console.log(this.state.showModal1, "showmodal1");
        this.setState({
            showModal1: !this.state.showModal1
        })
        console.log(this.state.showModal1, "showmodal1after");
    }

    changeModal2 = () => {
        console.log(this.state.showModal2, "showmodal2");
        this.setState({
            showModal2: !this.state.showModal2
        })
        console.log(this.state.showModal2, "showmodal2after");
    }


    pwChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            Password: pwChar
        });
    }

    localOnChange = (inputValue, name) => {
        console.log('inputValue', inputValue, "changing metric text", name);
        this.setState({
            [name]: inputValue
        })
    }

    render() {
        // tried to use this to darken the background when the camera source is open, works but leaves out the 
        // text inputs. Need to either, change the bg's of the TI's or restyle the body of the modal, 
        // restyle is probably better practice
        let TestAsset = {
            Image: HercLogo,
            Name: "Test Asset Name"
        }

        let metricInputs = this.renderInputs();

        // { backgroundColor: this.state.showModal1 ? 'rgba(0,0,0,0.5)' : ColorConstants.MainGray}
        return (

            <View style={[localStyles.container,{paddingTop: 22}]}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />

                {/* {AssetCard(TestAsset)} */}

                {/* <Icon.Button name="eye" backgroundColor="#3b5998"
                    onPress={() => this.changeModal1()}>
                </Icon.Button>

                <Icon.Button labelTitle="Modal2" name="camera" backgroundColor="#3b5998"
                    onPress={() => this.changeModal2()}>
                </Icon.Button>
                {/* HercTextInputWithLabel(name, placeholder, label, localOnChange) */}
                {/* {HercTextInputWithLabel('Name', 'Asset Name', 'Asset Name', this.localOnChange)}
*/}
                {/* <View style={localStyles.passwordInputContainer}>
                    <Text style={localStyles.passwordInputlabel}>Asset Password</Text> */}
                <RegisterAssetPassword
                    placeholder='Asset Password'
                    pwChange={this.pwChange}
                />
                {/* </View> */}


                <HercTextInputWithLabel
                    name='Asset Name'
                    label='Asset Name'
                    placeholder='Asset Name'
                    localOnChange={this.localOnChange}
                />

                {/* Trying dynamically generated inputs that will rerender when you add one */}


                {metricInputs}

                <AddMetricButton onPress={this.changeModal1} />

                <AddPhotoButton onPress={this.changeModal2} />

                <RegisterButton onPress={this.onPressTest} />
                {/* Modal 1 */}
                <Modal

                    isvisible={this.state.showModal1}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={modalStyles.lowerModalContainer}>
                        <Text style={modalStyles.menuTitle}>Choose Image Source</Text>
                        {/* <Text style={modalStyles.labelTitle}>LabeltitleThis is Modal1 Slide</Text> */}

                        <View style={modalStyles.imageSourceContainer}>

                            <View style={modalStyles.sourceIconContainer}>
                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        containerStyle={modalStyles.iconButton}
                                        name="camera"
                                        size={20}
                                        color="black"
                                        onPress={() => this.changeModal1()}>
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Camera</Text>
                            </View>

                            <View style={modalStyles.sourceIconContainer}>
                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        name="folder-open"
                                        size={20}
                                        containerStyle={modalStyles.iconButton}
                                        color="black"
                                        onPress={() => this.changeModal1()}>
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Gallery</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Modal 2 */}
                <Modal
                    animationType={'fade'}
                    isVisible={this.state.showModal2}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={modalStyles.modalCenter}>
                        <View style={modalStyles.modalContent2}>
                            <Image source={{ uri: "https://cdn.dribbble.com/users/108183/screenshots/3488148/liquid_preloader_by_volorf.gif" }} style={{ height: 50, width: 50 }} />
                            {/* <Image source={this.gif()} style={{ height: 50, width: 50 }} /> */}
                            <Text style={modalStyles.labelTitle}>This is Modal2 Fade</Text>
                            <View style={modalStyles.iconButton}>
                                <Icon.Button
                                    name="adjust"
                                    color="black"
                                    backgroundColor={ColorConstants.MainGray}
                                    onPress={() => this.changeModal2()}>
                                </Icon.Button>
                            </View>
                        </View>
                    </View>
                </Modal>



            </View >
        )
    }
}

const localStyles = StyleSheet.create({

    imageSourceContainer: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        padding: 10,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        height: '50%',
        borderWidth: 0,


    },

    sourceIconContainer: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.MainGray
    },

    iconButton: {
        alignSelf: 'center',
        marginLeft: 10,
        backgroundColor: ColorConstants.MainGray
        // height: widthPercentageToDP('5'),
        // width: heightPercentageToDP('5'),

    },

    camSourceIcon: {
        backgroundColor: ColorConstants.MainGray,
        justifyContent: 'center',
        alignSelf: 'center',
        // height: widthPercentageToDP('10'),
        // width: heightPercentageToDP('10'),

    },



    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    modalButton: {
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 2,
        borderWidth: 2,
    },
    wordsText: {
        textAlign: 'center',
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },

    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        alignItems: "center",
        justifyContent: "flex-start",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    labelTitle: {
        fontSize: 18,
        color: ColorConstants.MainBlue,
        margin: 5
    },
    menuTitle: {
        color: ColorConstants.MainBlue,
        fontSize: 26,
        margin: 5,

    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.ElementBG
    }

})