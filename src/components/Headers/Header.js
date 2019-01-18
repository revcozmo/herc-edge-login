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
import ComponentTest from "../../screens/ComponentTest";
const bgImage = require("../../assets/main-bg.png")

class BackButton extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {navigate}  = this.props.navigation
        console.log(navigate, "in back button")
        return (
            <Icon
                onPress={() => navigate.goBack()}
                style={[styles.iconButton, { marginLeft: 20 }]}
                name='arrow-left'
                color={ColorConstants.MainGold}
            />)
    }

};

class SettingsButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {navigate}  = this.props.navigation
        console.log(navigate, "in settings button")
        return (
            <Icon onPress={() => navigate("settings")}
                style={[styles.iconButton, { marginRight: 20 }]}
                name='heart'
                color={ColorConstants.MainGold}
            />
        );
    }


}

{/* <Icon.Button /> for use once it's wired up */ }
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    // .navigation
    render() {
        var outsideNav = this.props.navigation
        // console.log(navigation, "mulitPurposeHeader")
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            <BackButton navigation={outsideNav} />
                        </View>
                        <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                        <View style={styles.sideHeaders}>
                            <SettingsButton navigation={outsideNav}/>
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

