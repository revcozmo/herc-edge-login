import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

// import styles from "../assets/styles";
import colorConstants from "../assets/colorConstants";
import React, { Component } from 'react';
import RegisterAssetInputComponent from "../components/RegisterAssetComponents/NewAssetPropInput";


export default class ComponentTest extends Component {

    render() {
        return (
            <View style={localStyles.container}>

                <RegisterAssetInputComponent placeholder="placeholderTest" />

                <RegisterAssetInputComponent placeholder="SecondplaceholderTest" />

            </View>
        )
    }

}
const localStyles = StyleSheet.create({
    textInputContainer: {
        width: "90%",
        height: "10%",
        alignSelf: "center"
    },
    textInput: {

        backgroundColor: colorConstants.MainGold

    },
    container: {
        flex: 1,
        backgroundColor: colorConstants.MainBlue,
        alignItems: "center",
        justifyContent: "center"
    },

})