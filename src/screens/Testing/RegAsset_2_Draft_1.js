import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Modal,
    TouchableHighlight,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
const hercRound = require("../../assets/hercLogoBreak.png")
import { AssetCard } from "../../components/AssetCard";
import {RegisterButton} from "../../components/RegisterAssetComponents/RegisterAssetInputs";
// import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"


export default class RegAsset_2_Draft_1 extends Component {

    constructor(props) {
        super(props);
        console.log("componentTest")

    }
    onPress = () => {
        console.log("Whattup Parsec!");
    }

    render() {
        let asset = {
            Logo: hercRound,
            Name: "Tester Asset",
            HercId: '42'
        }
        return (
            <View style={styles.baseContainer}>

                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'
                />
                {/* <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>

                </Icon.Button> */}
                <View style={styles.bodyContainer}>
                    <AssetCard asset={asset} />


                    <RegisterButton onPress={this.onPress} />
                </View>


            </View>



        )
    }

}
const localStyles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: ColorConstants.MainGray,
    //     alignItems: "center",
    //     justifyContent: "center"
    //   },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#00000040'

    },
    activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalButton: {
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 2,
        borderWidth: 2,
    },
    wordsText: {
        textAlign: 'center',
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },

    container: {
        width: '100%',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    inputLabel: {
        fontSize: 10,
        color: 'white'
    },
    inputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})