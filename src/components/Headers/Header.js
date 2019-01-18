import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./HeaderStyles";
import ColorConstants from "../../assets/ColorConstants";
const bgImage = require("../../assets/main-bg.png")

const BackButton = (
    <Icon
        onPress={() => navigation.goBack()}
        style={[styles.iconButton, {marginLeft: 20}]}
        name='arrow-left'
        color={ColorConstants.MainGold}
    />
);

const SettingsButton = (
    <Icon onPress={() => console.log("pressed Where settings will be")}
        style={[styles.iconButton,{marginRight: 20}]}
        name='heart'
        color={ColorConstants.MainGold}
    />
)

{/* <Icon.Button /> for use once it's wired up */ }
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const {navigation} = this.props.navigation
        console.log("mulitPurposeHeader")
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            {BackButton}
                        </View>
                        <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                        <View style={styles.sideHeaders}>
                            {SettingsButton}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
// const styles = StyleSheet.create({

//     headerCont: {
//         width: '100%',
//         height: '12%',
//         // flexDirection: 'row'
//     },
//     bgImage: {
//         flex: 1,
//     },

//     header__container: {
//         // backgroundColor: ColorConstants.MainBlue,
//         flexDirection: 'row',
//         width: '100%',
//         height: '100%',
//         justifyContent: 'space-between',
//         alignContent: "center",
//         alignItems: "center",
//         shadowColor: 'transparent',
//         marginTop: 5,
//     },

//     sideHeaders: {
//         alignSelf: 'center',
//         width: 20,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: ColorConstants.MainGray
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

