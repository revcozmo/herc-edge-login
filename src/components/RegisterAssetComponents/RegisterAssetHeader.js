import {
    StyleSheet,
    Text,
    View
} from "react-native";
import React, { Component } from "react";
// import { StackNavigator } from "react-navigation";
// import styles from "../../assets/styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from "../../assets/colorConstants";


{/* <Icon.Button /> for use once it's wired up */}
export default RegisterAssetHeader = (navigation) => {

    return (
        <View style={headerStyles.header__container}>

                <Icon.Button onPress={() => navigation.navigate.goBack()} style={headerStyles.sideHeaders} name='arrow-left' size={18} color={colors.MainGold} />

            <Text style={headerStyles.headerText}>Register Asset</Text>

                <Icon style={headerStyles.sideHeaders} name='heart' size={18} color={colors.MainGold} />

        </View>
    );
}



let headerStyles = StyleSheet.create({
    header__container: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        justifyContent: 'space-between',
        // alignContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    header_left: {
        alignSelf: 'flex-start'
    },
    header_right: {
        alignSelf: 'flex-end'
    },
    sideHeaders: {
        // marginTop: 18,
        width: 30,
        height: 30,
        textAlign: 'center'
    },
    headerText: {
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 20,
    },
    // header__container__centeredBox: {
    //     height: "100%",
    //     alignItems: "center",
    //     flexDirection: 'row'
    // },
    // header__text__box: {
    //     height: "100%",
    //     marginBottom: 5,
    //     marginLeft: 12,
    // },
    // header__image__box: {
    //     height: "100%",
    //     borderRadius: 100
    // },
    // assetHeaderLogo: {
    //     height: 35,
    //     width: 35,
    //     borderRadius: 50,
    // },
})