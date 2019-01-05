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
        <View style={localStyles.textInputContainer}>
            <TextInput style={localStyles.textInput}
                placeholder={props.placeholder}
                placeholder-text-color={colorConstants.MainBlue}
            />
        </View>
    )

}

const localStyles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: colorConstants.MainGray,
        width: "90%",
        height: "10%",
        alignSelf: "center"
    },
    textInput: {

        backgroundColor: colorConstants.MainGold

    }

})
