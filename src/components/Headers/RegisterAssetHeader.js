import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicon from 'react-native-vector-icons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import styles from "./HeaderStyles";
import ColorConstants from "../../assets/ColorConstants";

const BackButton = (
    <Icon.Button
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
        name='arrow-left'
        color={ColorConstants.MainGold}
    />
);

const SettingsButton = (
    <Icon1.Button
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
        <View style={styles.header__container}>
            <View style={styles.sideHeaders}>
               {BackButton}
            </View>
            <Text style={styles.headerText}>Register Asset</Text>
            <View style={styles.sideHeaders}>
                {SettingsButton}
            </View>
        </View>
    );
}


