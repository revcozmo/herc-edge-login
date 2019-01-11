import {
    Text,
    View,
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";

{/* <Icon.Button /> for use once it's wired up */ }
export default WelcomeHeader = ({navigation}) => {

    return (
        <View style={styles.header__container}>
            <View style={styles.sideHeaders}>
                <Icon style={styles.iconButton} name="arrow-left" color={ColorConstants.MainGold} />
            </View>

            {/* <Icon.Button onPress={() => navigation.navigate.goBack()} style={styles.sideHeaders} name='arrow-left' size={18} color={colors.MainGold} /> */}

            <Text style={styles.headerText}>WelcomeHeader</Text>
            <View style={styles.sideHeaders}>
                <Icon style={styles.iconButton} name="arrow-down" color={ColorConstants.MainGold} />
            </View>
        </View>
    );
}



