import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
    View,
    Image,
    Platform,
    StatusBar,
    TouchableHighlight,

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
// import IdologyForm from "../components/IdologyForm";


const MainNavigator = StackNavigator({ //this will be "createStackNavigator" after upgrading react-navigation
    Login: { screen: Login },
    Welcome: { screen: Welcome },
    MenuOptions: { screen: MenuOptions },
    Identity: { screen: IdologyForm },
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

}, {
        initialRouteName: 'Login', // was "Login" changing for testing the style migration
        navigationOptions: ({ navigation }) => ({

            headerTitle: <Image style={{
                height: 100,
                width: 240,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginLeft: 0,
            }}
                source={menuOptions} />,

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
