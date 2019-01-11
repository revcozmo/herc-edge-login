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
import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';


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

    changeModal1 = () => {
        console.log(this.state.showModal1, "showmodal1");
        this.setState({
            showModal1: !this.state.showModal1
        })
        console.log(this.state.showModal1, "showmodal1after");
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

                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Text>Modal1</Text>
                    </View>
                </View>

                <Icon name='eye' size={18} color={ColorConstants.MainGold} />
                <RegisterAssetInput name={'Input1'} placeholder={'hello'} onChangeText={(metchar, name) => this.onChangeText(metchar, name)} />
                <Modal
                    transparent={false}
                    animationType={'none'}
                    visible={this.state.showModal1}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={localStyles.modalBackground}>

                        <Image source={require("https://cdn.dribbble.com/users/108183/screenshots/3488148/liquid_preloader_by_volorf.gif")} style={{ height: 50, width: 50 }} />
                        <Text style={localStyles.labelTitle}>Here's some Handy Info!</Text>
                        <Icon.Button
                            name="eye"
                            style={styles.iconButton}
                            color={ColorConstants.MainGold}
                            backgroundColor="#3b5998"
                            onPress={() => this.changeModal1()}>
                        </Icon.Button>
                    </View>
                </Modal>

                <View style={locallocalStyles.PasswordInputContainer}>
                    <Text style={localStyles.passwordInputlabel}>MainGray!!!!</Text>
                    <RegisterAssetPassword placeholder='SecondplaceholderTest' onChange={this.onChange} />

                </View>

                <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
                </Icon.Button>

            </View>
        )
    }

}
const localStyles = StyleSheet.create({

    modalBackground1: {
        // flex: 1,
        height: heightPercentageToDP('20'),
        width: widthPercentageToDP('20'),

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: ColorConstants.MainSubRed
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