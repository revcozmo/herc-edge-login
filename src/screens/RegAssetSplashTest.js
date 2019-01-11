import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../assets/styles";
import ColorConstants from "../assets/ColorConstants";
import React, { Component } from 'react';
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';
import { StackNavigator } from "react-navigation";
import RegAssetHeader from "../components/Headers/RegisterAssetHeader";
export default class RegAssetSplashTest extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <RegAssetHeader navigation={navigation} />
    })

    constructor(props) {
        super(props);
        console.log(this.navigation)
       
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.baseContainer}>
                <View style={[styles.baseContainer,styles.splashTop]}>
                    <Image source={require('../assets/register-asset.png')}
                        style={styles.splashImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={[styles.baseContainer, styles.bodyContainer]}>
                    <Text style={styles.CopyHeader}>Header for the copy</Text>
                    <Text style={[styles.CopyHeader, styles.CopyBody]}>
                        Body of the CopyBody of the CopyBody of the CopyBody of the CopyBody of the Copy
                        Body of the CopyBody of the CopyBody of the CopyBody of the CopyBody of the Copy
                        Body of the CopyBody of the CopyBody of the CopyBody of the CopyBody of the Copy
                    </Text>

                    <Button title='Continue' onPress={() => navigate('ComponentTest')}>ContinueButton</Button>
                </View>

                {/* //     <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>

            //     </Icon.Button>
            //     <View style={styles.modalBackground}>
            //         <View style={styles.activityIndicatorWrapper}>
            //             <Text>Modal1</Text>
            //         </View>
            //     </View>

            //     <Icon name='eye' size={18} color={ColorConstants.MainGold} />
            //     <RegisterAssetInput dims={this.Dims} placeholder={'hello'} />

            //     <View style={localStyles.PasswordInputContainer}>
            //         <Text style={styles.passwordInputlabel}>MainGray!!!!</Text>
            //         <RegisterAssetPassword placeholder='SecondplaceholderTest' onChange={this.onChange} />

            //     </View>

            //     <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
            //     </Icon.Button> */}

            </View>
        )
    }

}
const localStyles = StyleSheet.create({

    baseContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: ColorConstants.MainBlue,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    bodyContainer: {
        // width: '100%',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        // alignItems: "center",
        // justifyContent: "center",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    splashTop: {
        width: widthPercentageToDP('98'),
        height: heightPercentageToDP('48'),
        padding: 5,
        justifyContent: 'center'
        // backgroundColor: ColorConstants.MainBlue

    },
    splashImage: {
        width: widthPercentageToDP('60'),
        height: heightPercentageToDP('60'),
        // marginTop: 15
        // flex: 1

    },


    CopyHeader: {
        fontSize: 14,
        textAlign: 'center',
        margin: 5
    },
    copyBody: {
        fontSize: 12

    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
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

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#00000040'

    },
    activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
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
    // wordsText: {
    //     textAlign: 'center',
    // },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },


    passwordInputLabel: {
        fontSize: 10,
        color: 'white'
    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})