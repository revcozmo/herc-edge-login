// import {
//     Image,
//     Platform,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableHighlight,
//     View
// } from "react-native";
// import colors from "../../assets/colorConstants";
// import React, { Component } from "react";
// import { StackNavigator } from "react-navigation";
// import styles from "../../assets/styles";
// import Icon from 'react-native-vector-icons/FontAwesome';

// const backArrow = (<Icon name='arrow-left' size={18} color={colors.MainGold} />)
// RegisterAssetHeader = () => {

//     headerStyle = {
//         height: Platform.OS === 'android' ? 60 : 100,
//         backgroundColor: colors.MainBlue,
//         shadowColor: 'transparent'
//     },

//     headerTitle= (<Text style={styles.headerText}>Register Asset</Text>),

//     headerLeft= backArrow

// }

// export default RegisterAssetHeader;







// // headerStyle: {
// //     height: Platform.OS === 'android' ? 60 : 100,
// //     backgroundColor: 'white',

// // },
// // headerTitleStyle: {
// //     marginTop: Platform.OS === 'android' ? 20 : 0,
// //     textAlign: 'center',
// //     textAlignVertical: 'center',
// //     backgroundColor: 'white',
// //     alignSelf: 'center',

// // },
// // headerRight: <TouchableHighlight onPress={() => navigation.navigate("Settings")}>
// // <Image source={DrawerIcon} style={styles.drawerIcon} />
// // </TouchableHighlight>
// // ,
// // headerLeft: <TouchableHighlight onPress={() => navigation.goBack()}>
// //     <Image source={backArrow} style={styles.backArrow} />
// // </TouchableHighlight>
// // }})

// let headerStyles = StyleSheet.create({
//     header__container: {
//         display: "flex",
//         height: 80,
//         alignSelf: "center",
//         flex: 1,
//         alignContent: "center",
//         alignItems: "center",
//         marginTop: 40,
//         paddingBottom: 20
//     },
//     header__container__centeredBox: {
//         height: "100%",
//         alignItems: "center",
//         flexDirection: 'row'
//     },
//     header__text__box: {
//         height: "100%",
//         marginBottom: 5,
//         marginLeft: 12,
//     },
//     header__image__box: {
//         height: "100%",
//         borderRadius: 100
//     },
//     assetHeaderLogo: {
//         height: 35,
//         width: 35,
//         borderRadius: 50,
//     },
//     headerText: {
//         fontFamily: "dinPro",
//         fontSize: 26,
//         alignSelf: "center",
//         fontWeight: "bold",
//         color: "black",
//         textAlign: "center",
//         marginTop: 2,
//     },
// })