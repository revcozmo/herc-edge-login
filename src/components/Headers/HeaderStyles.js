"use strict";
import { StyleSheet, Platform } from "react-native";
import ColorConstants from "../../assets/ColorConstants";


module.exports = StyleSheet.create({

    headerStyle: {
        justifyContent: 'center',
        // textAlign: 'center',
        alignItems: 'center',
        height: Platform.OS === 'android' ? 60 : 100,
        backgroundColor: ColorConstants.MainBlue,
        shadowColor: 'transparent',
        paddingTop: 20,
    },

    header__container: {
        backgroundColor: ColorConstants.MainBlue,
        flexDirection: 'row',
        width: '100%',
        height: Platform.OS === 'android' ? 60 : 100,
        justifyContent: 'space-between',
        alignContent: "center",
        alignItems: "center",
        shadowColor: 'transparent',
        paddingTop: 20,
        // marginTop: 20,
    },

    sideHeaders: {
        alignSelf: 'center',
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ColorConstants.MainGray
    },
    iconButton: {
        alignSelf: 'center',
        height: 18,
        width: 18,
    },

    headerText: {
        fontFamily: "Montserrat",
        fontSize: 22,
        alignSelf: "center",
        fontWeight: "bold",
        color: ColorConstants.MainGray,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center'

    },

    backArrow: {
        marginLeft: 5
    }

});
