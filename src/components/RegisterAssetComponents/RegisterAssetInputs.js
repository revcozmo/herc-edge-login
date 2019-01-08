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
// import console = require('console');



export function RegisterAssetInput(props) {
    return (
        <TextInput style={localStyles.textInput}
            placeholder={props.placeholder}
            placeholder-text-color={colorConstants.MainBlue}
            underlineColorAndroid='transparent'

        />
    )
}


// export function RegisterAssetPassword(props)  {

//         console.log(this.props)
//         let hidePW = true;


//     return (
//         <View style={localStyles.RegisterAssetInputPasswordContainer}>
         
//          <Text>{props.placeholder}</Text>
//             {/* <TextInput style={localStyles.textInput}
//                 placeholder={this.props.placeholder}
//                 placeholder-text-color={colorConstants.MainBlue}
//                 underlineColorAndroid='transparent'
//                 secureTextEntry={hidePW}
//                 onChangeText={pass => this.props.onChange(pass)}

//             /> */}
//         </View>
//                     // <Icon name='eye' size={18} color={colorConstants.MainGold} />
//     )
// }







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
       width: '90%',
       height: '18%',
        borderRadius: 2,
        backgroundColor: colorConstants.MainGold

    },
    // width: (width * .9),
    // height: (height * .056),


})
