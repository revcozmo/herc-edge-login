import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./HeaderStyles";
import { stackNavigator } from "react-navigation";
import ColorConstants from "../../assets/ColorConstants";
import ComponentTest from "../../screens/ComponentTest";
const bgImage = require("../../assets/main-bg.png")



/// Still stuck with header going back, it's there, just can't seem to put my finger on it


{/* <Icon.Button /> for use once it's wired up */ }
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    _goBack = () => {
        console.log(this.props.navigation, "trying to go back")
        this.props.navigation.goBack();
    }


    render() {
        console.log(this.props, "header")
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            <Icon
                                onPress={this._goBack}
                                style={[styles.iconButton, { marginLeft: 20 }]}
                                name='arrow-left'
                                color={ColorConstants.MainGold}
                            />
                        </View>
                        <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                        <View style={styles.sideHeaders}>
                            <Icon onPress={() => this.props.navigation.navigate("settings")}
                                style={[styles.iconButton, { marginRight: 20 }]}
                                name='heart'
                                color={ColorConstants.MainGold}
                            />
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

