import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';


export function AddPhotoButton(props) {
    return (

        <View style={localStyles.addPhotoButton}>

            <Icon
                style={localStyles.cameraIconContainer}
                color={ColorConstants.MainBlue}
                name='camera'
                onPress={() => console.log("camera press")}
            >
            </Icon>
            <Text style={localStyles.buttonLabel}>Add a Photo</Text>
        </View>


    )
}


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
                <View style={localStyles.RegisterAssetInputPasswordContainer}>
                    <HercTextInput
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        localOnChange={this.props.localOnChange}
                        style={{ margin: 0 }}
                    />
                </View>
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

                    <TextInput style={localStyles.passwordTextInput}
                        placeholder={this.props.placeholder}
                        placeholder-text-color={ColorConstants.MainBlue}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.hidePass}
                        onChangeText={pass => this.props.pwChange(pass)}

                    />
                    <View style={localStyles.eyeballContainer}>
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

    eyeballContainer: {
        justifyContent: 'center',
        backgroundColor: ColorConstants.ElementBG,
        // height: heightPercentageToDP('6'),
    },

    eyeBallButton: {
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
    },

    addPhotoButton: {
        height: heightPercentageToDP('8'),
        width: widthPercentageToDP('80'),
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },

    cameraIconContainer: {
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        marginLeft: '15%'

    },

    RegisterAssetInputPasswordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('3.5'),
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
        height: heightPercentageToDP('5'),
        borderRadius: 8,
        // backgroundColor: ColorConstants.MainGray,
        backgroundColor: ColorConstants.ElementBG,
        marginTop: 2.5,
        marginBottom: 2.5,
        marginLeft: 0,
        marginRight: 0,
        fontSize: 12,
        alignSelf: 'center'
    },
    labeledTextInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('5'),
        borderRadius: 0,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        fontSize: 12,
        alignSelf: 'center'
    },
    passwordTextInput: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('5'),
        borderRadius: 0,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        flex: 1,
        fontSize: 12,
        alignSelf: 'center'
    },


    inputLabel: {
        fontSize: 12,
        color: ColorConstants.MainBlue,
        marginLeft: 3,
        fontWeight: 'bold',
        height: 14
    },
    buttonLabel: {
        fontSize: 12,
        color: ColorConstants.MainBlue,
        margin: 5,
        marginLeft: '15%',
       alignSelf: 'center'
        
    },


    flexRow: {
        flex: 0,
        flexDirection: 'row'
    },
    passwordInputContainer: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 6,
        padding: 2,
        borderRadius: 8
        // backgroundColor: ColorConstants.MainSubCrownBlue
    }
    // width: (width * .9),
    // height: (height * .056),


})
