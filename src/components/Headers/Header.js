import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./HeaderStyles";
import { createStackNavigator } from "react-navigation";
import ColorConstants from "../../assets/ColorConstants";
const bgImage = require("../../assets/main-bg.png")



/// Still stuck with header going back, it's there, just can't seem to put my finger on it


{/* <Icon.Button /> for use once it's wired up */ }
 class Header extends Component {
    constructor(props) {
        super(props);
    }
    _goBack = () => {
        let navigation = this.props;
        let goBackTo = navigation.params.goBackTo
        console.log(navigation, "trying to go back")
        navigation.goBack(goBackTo);
    }


    render() {
        console.log(this.props, "header")
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            <Icon
                                onPress={() => this._goBack()}
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
export default Header;