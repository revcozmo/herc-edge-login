import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
    View,
    Image,
    Platform,
    StatusBar,
    TouchableHighlight,
    StyleSheet,
    Text

} from "react-native";
import { STATUS_BAR_HEIGHT } from "../constants";
import styles from "../assets/styles";
import menuOptions from "../assets/menuOptions.png";
import backArrow from "../assets/icon_backarrow.png";

////////////////////////////////////////// Screens
import Welcome from "../screens/Welcome";
import FileUp from "../screens/FileUp";
import DocUp from "../screens/DocUp";
import Confirm from "../screens/Confirm";
import Create from "../screens/Create";
import MenuOptions from "../screens/MenuOptions";
import InputMan from "../screens/InputMan";
import Tee from "../screens/Tee";
import Digi from "../screens/DigiViewer";
import Anthem from "../screens/Anthem";
import PreHipr from "../screens/PreHIPR";
import HiprAssets from "../screens/HiprAssets";
import Hipr from "../screens/Hipr";
import BlockScanner from "../screens/BlockScanner";
import TransSwiper from "../screens/TransSwiper";
import Splash1 from "../screens/Splash1";
import Splash2 from "../screens/Splash2";
import Splash3 from "../screens/Splash3";
import NewAssetConfirm from "../screens/NewAssetConfirm";
import EdiT from "../screens/Edi-T";
import PreDigi from "../screens/PreDigiView";
import SpaceScreen from "../screens/SpaceScreen";
import TransAssetList from "../screens/TransAssetList";
import Wallet from "../screens/Wallet";
import Settings from "../screens/Settings";
import Login from "../screens/Login";
import Identity from "../screens/Identity";
import IdologyForm from "../screens/IdologyForm";
import IdologyQuestions from "../screens/IdologyQuestions";
import Camera from "../screens/Camera";
import roundImage from "../assets/round.png"


let headerStyles = StyleSheet.create({
    header__container: {
        // borderColor: "green",
        // borderWidth: 3,
        display: "flex",
        // resizeMode: "contain",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20

    },
    header__container__centeredBox: {
        // borderColor: "purple",
        // borderWidth: 3,
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
    },
    header__text__box: {
        // borderColor: "blue",
        // borderWidth: 3,
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,

    },
    header__image__box: {
        // borderColor: "yellow",
        // borderWidth: 3,
        height: "100%",
        borderRadius: 100
        // width: 50
    },
    assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
        // resizeMode: "contain",
    },
    headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
        // paddingTop: 5
    },
})


const MainNavigator = StackNavigator({ //this will be "createStackNavigator" after upgrading react-navigation
    Login: { screen: Login },
    Welcome: { screen: Welcome },
    MenuOptions: { screen: MenuOptions },
    Identity: { screen: IdologyForm },
    IdologyQuestions: { screen: IdologyQuestions },
    // Identity: { screen: Identity },
    Create: { screen: Create },
    Tee: { screen: Tee },
    Digi: { screen: Digi },
    Anthem: { screen: Anthem },
    PreHipr: { screen: PreHipr },
    HiprAssets: { screen: HiprAssets },
    Hipr: { screen: Hipr },
    BlockScanner: { screen: BlockScanner },
    TransSwiper: { screen: TransSwiper },
    TransAssetList: { screen: TransAssetList },
    Splash1: { screen: Splash1 },
    Splash2: { screen: Splash2 },
    Splash3: { screen: Splash3 },
    InputMan: { screen: InputMan },
    FileUp: { screen: FileUp },
    DocUp: { screen: DocUp },
    Confirm: { screen: Confirm },
    NewAssetConfirm: { screen: NewAssetConfirm },
    EdiT: { screen: EdiT },
    PreDigi: { screen: PreDigi },
    SpaceScreen: { screen: SpaceScreen },
    Wallet: { screen: Wallet },
    Settings: { screen: Settings },
    Camera: { screen: Camera }

}, {
        initialRouteName: 'MenuOptions', // was "Login" changing for testing the style migration
        navigationOptions: ({ navigation }) => ({

            headerTitle:
                <View style={headerStyles.header__container}>
                    <View style={headerStyles.header__container__centeredBox}>
                        <View style={headerStyles.header__image__box}>
                            {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
                            </TouchableHighlight> */}
                            <Image
                                style={headerStyles.assetHeaderLogo}
                                source={roundImage}
                            />
                        </View>
                        <View style={headerStyles.header__text__box}>
                            <Text style={headerStyles.headerText}>Main Options</Text>
                        </View>
                    </View>
                </View>,

            headerStyle: {
                height: Platform.OS === 'android' ? 60 : 100,
                backgroundColor: 'white',

            },
            headerTitleStyle: {
                marginTop: Platform.OS === 'android' ? 20 : 0,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',

            },
            headerRight: <View></View>,
            headerLeft: <TouchableHighlight onPress={() => navigation.goBack()}>
                <Image source={backArrow} style={styles.backArrow} />
            </TouchableHighlight>

        })
    })

export default MainNavigator;
