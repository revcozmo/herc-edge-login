import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Modal,
    Image
} from 'react-native';
import loadingGif from "../assets/icons/liquid_preloader_by_volorf.gif";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../assets/styles";
import ColorConstants from "../assets/ColorConstants";
import React, { Component } from 'react';
import RegisterAssetPassword, { RegisterAssetInput } from "../components/RegisterAssetComponents/RegisterAssetInputs";
import RegisterAssetHeader from "../components/Headers/RegisterAssetHeader"
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';


export default class ComponentTest extends Component {

    static navigationOptions = {

        header: <RegisterAssetHeader />
    }

    constructor(props) {
        super(props);
        console.log("componentTest")
        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
        }
    }

    gif = () => {
        return fetch("https://cdn.dribbble.com/users/108183/screenshots/3488148/liquid_preloader_by_volorf.gif");
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


    onChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            testText: pwChar
        });
    }

    onChangeText = (metChar, name) => {
        console.log('metChar', metChar, "changing metric text");
        this.setState({
            [name]: metChar
        })
    }

    render() {


        return (
            <View style={localStyles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                />

                <Icon.Button name="eye" backgroundColor="#3b5998"
                    onPress={() => this.changeModal1()}>
                </Icon.Button>

                <Icon.Button labelTitle="Modal2" name="camera" backgroundColor="#3b5998"
                    onPress={() => this.changeModal2()}>
                </Icon.Button>


                <Icon name='eye' size={18} color={ColorConstants.MainGold} />
                <RegisterAssetInput name={'Input1'} placeholder={'hello'} onChangeText={(metchar, name) => this.onChangeText(metchar, name)} />


                <View style={localStyles.PasswordInputContainer}>
                    <Text style={localStyles.passwordInputlabel}>MainGray!!!!</Text>
                    <RegisterAssetPassword placeholder='SecondplaceholderTest' onChange={this.onChange} />

                </View>

                <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
                </Icon.Button>
                {/* Modal 1 */}
                <Modal
                    transparent={false}
                    animationType={'slide'}
                    visible={this.state.showModal1}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={localStyles.modalLower}>

                        <View style={localStyles.modalContent1}>
                            <Image source={{ uri: "https://cdn.dribbble.com/users/108183/screenshots/3488148/liquid_preloader_by_volorf.gif" }} style={{ height: 50, width: 50 }} />
                            {/* <Image source={this.gif()} style={{ height: 50, width: 50 }} /> */}
                            <Text style={localStyles.labelTitle}>This is Modal1 Slide</Text>
                            <View style={localStyles.iconButton}><Icon.Button
                                name="eye"
                                style={styles.iconButton}
                                color={ColorConstants.MainGold}
                                backgroundColor="#3b5998"
                                onPress={() => this.changeModal1()}>
                            </Icon.Button>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Modal 2 */}
                <Modal
                    style={localStyles.modal}
                    transparent={true}
                    animationType={'fade'}
                    visible={this.state.showModal2}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={localStyles.modal}>
                        <View style={localStyles.modalContent2}>
                            <Image source={{ uri: "https://cdn.dribbble.com/users/108183/screenshots/3488148/liquid_preloader_by_volorf.gif" }} style={{ height: 50, width: 50 }} />
                            {/* <Image source={this.gif()} style={{ height: 50, width: 50 }} /> */}
                            <Text style={localStyles.labelTitle}>This is Modal2 Fade</Text>
                            <View style={localStyles.iconButton}>
                                <Icon.Button
                                    name="adjust"
                                    color={ColorConstants.MainGold}
                                    backgroundColor="#3b5998"
                                    onPress={() => this.changeModal2()}>
                                </Icon.Button>
                            </View>
                        </View>
                    </View>
                </Modal>



            </View>
        )
    }
}
const localStyles = StyleSheet.create({
    iconButton: {
        alignSelf: 'center',
        height: widthPercentageToDP('5'),
        width: heightPercentageToDP('5'),
    },

    modalCenter: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',

    },

    modalLower: {
        width: '100%',
        height: heightPercentageToDP('15'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // alignContent: 'flex-end',
        top: heightPercentageToDP('70'),
        backgroundColor: 'blue',
        borderRadius: 20
    },

    modalContent1: {
        // flexDirection: 'column',
        backgroundColor: ColorConstants.MainSubRed,
        height: widthPercentageToDP('30'),
        width: heightPercentageToDP('25'),
        justifyContent: 'center',

    },
    modalContent2: {
        backgroundColor: ColorConstants.MainSubRed,
        height: widthPercentageToDP('30'),
        width: heightPercentageToDP('25'),
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
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    labelTitle: {
        fontSize: 10,
        color: 'white'
    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})