import {
    Text,
    View,
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "../../assets/styles";
import ColorConstants from "../../assets/colorConstants";

{/* <Icon.Button /> for use once it's wired up */ }
export default WelcomeHeader = (navigation) => {

    return (
        <View style={styles.header__container}>
            <View style={styles.sideHeaders}>
                <Text>helloLeft</Text>
            </View>

            {/* <Icon.Button onPress={() => navigation.navigate.goBack()} style={styles.sideHeaders} name='arrow-left' size={18} color={colors.MainGold} /> */}

            <Text style={styles.headerText}>WelcomeHeader</Text>
            <View style={[styles.sideHeaders}>
                <Icon style={styles.sideHeaders} name="arrow-down" size={18} color={ColorConstants.MainGold} />
            </View>
        </View>
    );
}



// let headerStyles = StyleSheet.create({
//     header__container: {
//         backgroundColor: ColorConstants.MainBlue,
//         flexDirection: 'row',
//         width: '100%',
//         height: 80,
//         justifyContent: 'space-between',
//         alignContent: "center",
//         alignItems: "center",
//         // marginTop: 20,
//     },

//     header_left: {
//         alignSelf: 'center'
//     },
//     header_right: {
//         alignSelf: 'center'
//     },
//     sideHeaders: {
//         width: '20%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: ColorConstants.MainGray
//     },
//     headerText: {
//         fontSize: 26,
//         alignSelf: "center",
//         fontWeight: "bold",
//         color: "white",
//         textAlign: "center",
//     },
//     // header__container__centeredBox: {
//     //     height: "100%",
//     //     alignItems: "center",
//     //     flexDirection: 'row'
//     // },
//     // header__text__box: {
//     //     height: "100%",
//     //     marginBottom: 5,
//     //     marginLeft: 12,
//     // },
//     // header__image__box: {
//     //     height: "100%",
//     //     borderRadius: 100
//     // },
//     // assetHeaderLogo: {
//     //     height: 35,
//     //     width: 35,
//     //     borderRadius: 50,
//     // },
// })