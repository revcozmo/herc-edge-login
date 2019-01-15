import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export function HercTextInput(name, placeholder, localOnChange) {
    return (
        <TextInput style={localStyles.textInput}
            placeholder={placeholder}
            placeholder-text-color={ColorConstants.MainBlue}
            underlineColorAndroid='transparent'
            onChangeText={(inputVal) => localOnChange(inputVal, name)}

        />
    )
}

export function HercTextInputWithLabel(name, placeholder, label, localOnChange) {
    return (

        <View style={localStyles.PasswordInputContainer}>
            <Text style={localStyles.passwordInputlabel}>{label}</Text>
            {HercTextInput(name, placeholder, localOnChange)}
        </View>
    )
}



export default class RegisterAssetPassword extends Component {
    constructor(props) {
        super(props);
        console.log(props, "registerAssetPassword")
        this.state = {
            hidePass: true
        }
    }
    onHideShow = () => {
        console.log("hidingshow")
        this.setState({
            hidePass: !this.state.hidePass
        })
    }

    render() {
        return (
            <View style={localStyles.TextInput}>

                <TextInput style={[localStyles.textInput, localStyles.flexRow]}
                    placeholder={this.props.placeholder}
                    placeholder-text-color={ColorConstants.MainBlue}
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.state.hidePass}
                    onChangeText={pass => this.props.pwChange(pass)}

                />
                <Icon.Button
                    style={localStyles.eyeBallButton}
                    color={ColorConstants.MainBlue}
                    name='eye'
                    onPress={() => this.onHideShow()}

                >
                </Icon.Button>

            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    RegisterAssetInputPasswordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGold,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('7'),
        borderRadius: 8,

    },
    textInputContainer: {
        backgroundColor: ColorConstants.MainGray,
        width: "90%",
        height: "25%",
        borderRadius: 8
    },
    textInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('7'),
        borderRadius: 8,
        backgroundColor: ColorConstants.MainGray,
        margin: 5
    },
    eyeBallButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: ColorConstants.MainGray,
        height: heightPercentageToDP('6'),
        borderRadius: 0,
    },

    flexRow: {
        flex: 0,
        flexDirection: 'row'
    }
    // width: (width * .9),
    // height: (height * .056),


})
