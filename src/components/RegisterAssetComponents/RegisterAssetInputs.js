import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export function RegisterAssetInput(props) {
    return (
        <TextInput style={localStyles.textInput}
            placeholder={props.placeholder}
            placeholder-text-color={ColorConstants.MainBlue}
            underlineColorAndroid='transparent'
            onChangeText={ (inputName) => props.onChangeText(inputName)}

        />
    )
}

export default class RegisterAssetPassword extends Component {
    constructor(props) {
        super(props);
        console.log(props, "registerAssetPassword")
        this.state = {
            showPass: true
        }
    }
    onHideShow = () => {
        console.log("hidingshow")
        this.setState({
            showPass: !this.state.showPass
        })
    }

    render() {
        return (
            <View style={localStyles.RegisterAssetInputPasswordContainer}>

                <TextInput style={[localStyles.textInput, { flex: 1 }]}
                    placeholder={this.props.placeholder}
                    placeholder-text-color={ColorConstants.MainBlue}
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.state.showPass}
                    onChangeText={pass => this.props.onChange(pass)}

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
        height: heightPercentageToDP('6'),
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
        height: heightPercentageToDP('6'),
        borderRadius: 2,
        backgroundColor: ColorConstants.MainGold

    },
    eyeBallButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: ColorConstants.MainGold,
        height: heightPercentageToDP('6'),
        borderRadius: 0,
    }
    // width: (width * .9),
    // height: (height * .056),


})
