import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
// import styles from "../../assets/styles";
import colorConstants from "../../assets/colorConstants";
export default RegisterAssetInput = (props) => {
    return (
            <TextInput style={localStyles.textInput}
                placeholder={props.placeholder}
                placeholder-text-color={colorConstants.MainBlue}

            />
    )

}

const localStyles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: colorConstants.MainGray,
        width: "90%",
        height: "10%",
        borderRadius: 25
    },
    textInput: {
        width: "90%",
        height: "10%",
        borderRadius: 25,
        backgroundColor: colorConstants.MainGold

    }

})
