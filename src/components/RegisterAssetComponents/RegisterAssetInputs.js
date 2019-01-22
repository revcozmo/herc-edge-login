import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';

const hercSVGIcon = require('../../assets/icons/hercicon.svg');
const hercpngIcon = require('../../assets/icons/hercIcon.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export function CostDisplay(props) {

    return (
        <View style={[localStyles.textFieldContainer, { backgroundColor: ColorConstants.MainBlue }]}>
            <Text style={localStyles.textLabel}>Amount</Text>

            <View style={localStyles.flexRow}>
                <Text style={[localStyles.textFieldText, { color: 'white'}]}>{props.amount}</Text>
                <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />
            </View>
        </View>

    )

}

export function RegisterButton(props) {
    return (

        <TouchableHighlight onPress={props.onPress} style={localStyles.registerButton}>
            <Text style={localStyles.buttonLabel}>Register</Text>
        </TouchableHighlight>
    )
}


export function AddPhotoButton(props) {
    return (

        <View style={localStyles.addPhotoButton}>

            <Icon
                style={localStyles.cameraIconContainer}
                color={ColorConstants.MainBlue}
                name='camera'
                onPress={props.onPress}
            >
            </Icon>
            <Text style={localStyles.buttonLabel}>Add a Photo</Text>
        </View>


    )
}

export function AddMetricButton(props) {
    return (

        <View style={localStyles.addMetricButton}>

            <Text style={[localStyles.buttonLabel, { marginLeft: 0 }]}>Add a Metric</Text>
            <View style={localStyles.cameraIconContainer}>
                <Icon
                    color={ColorConstants.MainBlue}
                    name='plus-circle'
                    onPress={props.onPress}
                >
                </Icon>

            </View>
        </View>

    )
}

export class HercTextField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={localStyles.textFieldContainer}>
                <Text style={localStyles.textField}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

export class HercTextFieldWithLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <View style={localStyles.textFieldContainer}>
                <Text style={localStyles.textLabel}>{this.props.label}</Text>
                <Text style={localStyles.textField}>{this.props.text}</Text>
            </View>
        )
    }

}


export class HercTextInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let name = this.props.name;
        return (
            <View style={localStyles.textFieldContainer}>
                <TextInput style={localStyles.textField}
                    placeholder={this.props.placeholder}
                    placeholder-text-color={ColorConstants.MainSubGray}
                    underlineColorAndroid='transparent'
                    onChangeText={(inputVal) => this.props.localOnChange(inputVal, name)}

                />
            </View>
        )
    }
}

export class HercTextInputWithLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <View style={[localStyles.textFieldContainer, { paddingTop: 9 }]}>

                <Text style={localStyles.textLabel}>{this.props.label}</Text>
                <TextInput
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    localOnChange={this.props.localOnChange}
                    style={localStyles.labeledTextInput}
                />
            </View>
        )
    }

}


export class BasePasswordInput extends Component {
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
            <View style={[localStyles.textFieldContainer, { paddingTop: 9 }]}>
                <Text style={localStyles.textLabel}>Asset Password</Text>
                <View style={localStyles.RegisterAssetInputPasswordContainer}>

                    <TextInput style={localStyles.passwordTextInput}
                        placeholder={this.props.placeholder}
                        placeholder-text-color={ColorConstants.MainBlue}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.hidePass}
                        onChangeText={pass => this.props.pwChange(pass)}
                        value={this.props.value || ""}
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
        height: heightPercentageToDP('6'),
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
        height: heightPercentageToDP('5.5'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        paddingLeft: 5,
        borderRadius: 8
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
