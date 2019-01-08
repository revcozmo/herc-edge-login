import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    Text,
    Dimensions

} from 'react-native';
// import styles from "../../assets/styles";
import colorConstants from "../../assets/colorConstants";
import Icon from 'react-native-vector-icons';

var {height, width} = Dimensions.get('window');

export function RegisterAssetInput(props) {
    return (
        <TextInput style={localStyles.textInput}
            placeholder={props.placeholder}
            placeholder-text-color={colorConstants.MainBlue}
            underlineColorAndroid='transparent'

        />
    )
}


export function RegisterAssetPassword(props) {
    let hidePW = true;
    return (
        <View style={localStyles.RegisterAssetInputPasswordContainer}>
            <TextInput style={localStyles.textInput}
                placeholder={props.placeholder}
                placeholder-text-color={colorConstants.MainBlue}
                underlineColorAndroid='transparent'
                secureTextEntry={hidePW}
                onChangeText={pass => props.onChange(pass)}
                
            />
            <TouchableHighlight onPress={() => hidePW = !hidePW}>
              <Text>eyeball</Text>
            </TouchableHighlight>
        </View>
    )
}








const localStyles = StyleSheet.create({
    RegisterAssetInputPasswordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: colorConstants.MainSubGreen,
    },
    textInputContainer: {
        backgroundColor: colorConstants.MainGray,
        width: "90%",
        height: "25%",
        borderRadius: 8
    },
    textInput: {
        width: "90%",
        height: (height * .12),
        borderRadius: 2,
        backgroundColor: colorConstants.MainGold

    },
    


})
