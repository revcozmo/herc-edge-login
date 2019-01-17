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





export class HercTextInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let name = this.props.name;
        return (
            <TextInput style={localStyles.textInput}
                placeholder={this.props.placeholder}
                placeholder-text-color={ColorConstants.MainBlue}
                underlineColorAndroid='transparent'
                onChangeText={(inputVal) => this.props.localOnChange(inputVal, name)}

            />
        )
    }
}

export class HercTextInputWithLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <View style={localStyles.passwordInputContainer}>
                <Text style={localStyles.inputLabel}>{this.props.label}</Text>
                <HercTextInput
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    localOnChange={this.props.localOnChange}
                />
            </View>
        )
    }

}

export class RegisterAssetPassword extends Component {
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
            <View style={localStyles.passwordInputContainer}>
                <Text style={localStyles.inputLabel}>Asset Password</Text>
                <View style={localStyles.RegisterAssetInputPasswordContainer}>

                    <TextInput style={localStyles.labeledTextInput}
                        placeholder={this.props.placeholder}
                        placeholder-text-color={ColorConstants.MainBlue}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.hidePass}
                        onChangeText={pass => this.props.pwChange(pass)}

                    />
                    <View>
                        <Icon.Button
                            style={localStyles.eyeBallButton}
                            color={ColorConstants.MainBlue}
                            name='eye'
                            onPress={() => this.onHideShow()}

                        >
                        </Icon.Button>
                    </View>
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    RegisterAssetInputPasswordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        borderRadius: 8,
        margin: 5

    },
    textInputContainer: {
        backgroundColor: ColorConstants.ElementBG,
        // backgroundColor: ColorConstants.MainGray,
        width: "90%",
        height: "25%",
        borderRadius: 8
    },
    textInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        borderRadius: 8,
        // backgroundColor: ColorConstants.MainGray,
        backgroundColor: ColorConstants.ElementBG,
        margin: 5
    },
    labeledTextInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        borderRadius: 0,
        // backgroundColor: ColorConstants.MainGray,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        flex: 1
    },


    inputLabel: {
        fontSize: 20,
        color: ColorConstants.MainBlue,
        marginLeft: 3
    },
    eyeBallButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: ColorConstants.ElementBG,
        // backgroundColor: ColorConstants.MainGray,
        height: heightPercentageToDP('6'),
        borderRadius: 0,
    },

    flexRow: {
        flex: 0,
        flexDirection: 'row'
    },
    passwordInputContainer: {
        width: widthPercentageToDP('90'),
        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        padding: 2,
        borderRadius: 8
        // backgroundColor: ColorConstants.MainSubCrownBlue
    }
    // width: (width * .9),
    // height: (height * .056),


})
