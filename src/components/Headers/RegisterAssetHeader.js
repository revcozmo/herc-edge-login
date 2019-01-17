import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "./HeaderStyles";
import ColorConstants from "../../assets/ColorConstants";
const bgImage = require("../../assets/main-bg.png")

const BackButton = (
    <Icon.Button
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
        name='arrow-left'
        color={ColorConstants.MainGold}
    />
);

const SettingsButton = (
    <Icon.Button
        onPress={() => console.log("pressed Where settings will be")}
        style={styles.iconButton}
        name='heart'
        color={ColorConstants.MainGold}
    />
)

{/* <Icon.Button /> for use once it's wired up */ }
export default RegisterAssetHeader = (navigation) => {
    console.log("regAssetHeader")
    return (
        <View style={styles.headerCont}>
            <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={styles.header__container}>
                <View style={styles.sideHeaders}>
                    {BackButton}
                </View>
                <Text style={styles.headerText}>Register Asset</Text>
                <View style={styles.sideHeaders}>
                    {SettingsButton}
                </View>
            </View>
            </ImageBackground>
        </View>
    );
}

// const styles = StyleSheet.create({

//     headerCont: {
//         flex: 1
//     },
//     bgImage: {
//         flex: 1,
//         resizeMode: 'cover'
//     },

//     header__container: {
//         // backgroundColor: ColorConstants.MainBlue,
//         flexDirection: 'row',
//         width: '100%',
//         height: '15%',
//         justifyContent: 'space-between',
//         alignContent: "center",
//         alignItems: "center",
//         shadowColor: 'transparent',
//         paddingTop: 20,
//         // marginTop: 20,
//     },

//     sideHeaders: {
//         alignSelf: 'center',
//         width: '20%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: ColorConstants.MainGray
//     },
//     iconButton: {
//         alignSelf: 'center',
//         height: 18,
//         width: 18,
//     },

//     headerText: {
//         fontFamily: "Montserrat",
//         fontSize: 22,
//         alignSelf: "center",
//         fontWeight: "bold",
//         color: ColorConstants.MainGray,
//         textAlign: "center",
//         alignItems: "center",
//         justifyContent: "center",
//         alignContent: 'center'

//     },

//     backArrow: {
//         marginLeft: 5
//     }

// });

