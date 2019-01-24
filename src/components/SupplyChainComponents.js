import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';



export function AddAssetButton(props) {
    return (

        <View style={localStyles.addAssetButton}>

            <Text style={[localStyles.buttonLabel, { marginLeft: 0, color: 'white' }]}>Create New</Text>
            <View style={localStyles.cameraIconContainer}>
                <Icon
                    color={'white'}
                    name='plus-circle'
                    onPress={props.onPress}
                >
                </Icon>

            </View>
        </View>

    )
}

const localStyles = StyleSheet.create({

    addAssetButton: {
        height: heightPercentageToDP('6'),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    addMetricButton: {
        height: heightPercentageToDP('4'),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        margin: 5,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    costDisplay: {
        height: 40,
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainBlue,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        alignSelf: 'center'
        // marginTop: heightPercentageToDP('20')
    },
    eyeballContainer: {
        justifyContent: 'center',
        backgroundColor: ColorConstants.ElementBG,
        // height: heightPercentageToDP('6'),
    },

    eyeBallButton: {
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
    },

    registerButton: {
        height: 40,
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        alignSelf: 'center'
        // marginTop: heightPercentageToDP('20')
    },


    addPhotoButton: {
        height: heightPercentageToDP('8'),
        width: widthPercentageToDP('80'),
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },

    cameraIconContainer: {
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        // marginLeft: '15%'

    },

    RegisterAssetInputPasswordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('4'),
        borderRadius: 8,
        margin: 5

    },
    // textInput: {
    //     borderRadius: 8,
    //     // backgroundColor: ColorConstants.MainGray,
    //     backgroundColor: ColorConstants.ElementBG,
    //     marginTop: 0,
    //     marginBottom: 0,
    //     paddingLeft: 5,
    //     textAlign: 'left',
    //     marginLeft: 0,
    //     marginRight: 0,
    //     fontSize: 17,
    //     height: 40,
    //     width: '100%'
    //     // alignSelf: 'center'
    // },
    textInputContainer: {
        flex: 0,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        paddingLeft: 5,
        borderRadius: 8
    },
    textField: {
        color: ColorConstants.MainBlue,
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        // fontSize: 14,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 17,
        borderRadius: 8,
        height: heightPercentageToDP('4.95'),
        paddingBottom: 0
    },
    textFieldText: {
        color: ColorConstants.MainBlue,
        marginRight: 5,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 17,
    },
    textFieldContainer: {
        flex: 0,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        paddingLeft: 5,
        borderRadius: 8,
        paddingBottom: 10
        // backgroundColor: ColorConstants.MainSubCrownBlue
    },


    labeledTextInput: {
        color: ColorConstants.MainBlue,
        width: '100%',
        borderRadius: 8,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        fontSize: 17,
        height: heightPercentageToDP('5.5')
    },
    passwordTextInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('5.5'),
        borderRadius: 0,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        flex: 1,
        fontSize: 17,
        alignSelf: 'center'
    },


    textLabel: {
        fontSize: 12,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'normal',
        marginTop: 10
    },
    buttonLabel: {
        fontSize: 12,
        color: ColorConstants.MainBlue,
        margin: 5,
        // marginLeft: '15%',
        alignSelf: 'center'

    },

    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },

    // width: (width * .9),
    // height: (height * .056),


})
