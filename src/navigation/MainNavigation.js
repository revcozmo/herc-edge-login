import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../assets/colorConstants";

import BlockScanner from "../screens/BlockScanner";
import Camera from "../screens/Camera";
import Confirm from "../screens/Confirm";
import NewAssetLanding from "../screens/NewAssetLanding";
import DocUp from "../screens/DocUp";
import EdiT from "../screens/Edi-T";
import ImageUpload from "../screens/ImageUpload";
import Hipr from "../screens/Hipr";
import HiprTransactions from "../screens/HiprTransactions";
import HiprAssets from "../screens/HiprAssets";
import MetricInput from "../screens/MetricInput";
import Login from "../screens/Login";
import MenuOptions from "../screens/MenuOptions";
import NewAssetConfirm from "../screens/NewAssetConfirm";
import HiprLanding from "../screens/HiprLanding";
import TrackAssetOptions from "../screens/TrackAssetOptions";
import SupplyChainAssetList from "../screens/SupplyChainAssetList";
import SupplyChainTxRx from "../screens/SupplyChainTxRx";
import SupplyChainReview from "../screens/SupplyChainReview";
import NewAssetForm from "../screens/NewAssetForm";
import TrackAssetList from "../screens/TrackAssetList";
import TxSwiperContainer from "../screens/TxSwiperContainer";
import TxSwiper from "../components/TxSwiper";
import Wallet from "../screens/Wallet";
import Settings from "../screens/Settings";
import QRCapture from "../screens/QRCapture";
import QRCapture2 from "../screens/QRCapture2";
import roundImage from "../assets/round.png"
import styles from "../assets/styles";
import backArrow from "../assets/icon_backarrow.png"; // TODO: turn into vector icon!
import DrawerIcon from "../assets/icons/drawerIcon.png"; // TODO: turn into vector icon!
import WebViewComponent from "../components/WebViewComponent";
import DocumentStorage from "../screens/DocumentStorage";
import DocumentQRScanner from "../screens/DocumentQRScanner";
import ComponentTest from "../screens/ComponentTest";
import RegAssetSplashTest from "../screens/RegAssetSplashTest";


let headerStyles = StyleSheet.create({
    header__container: {
        display: "flex",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20
    },
    header__container__centeredBox: {
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
    },
    header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,
    },
    header__image__box: {
        height: "100%",
        borderRadius: 100
    },
    assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
    },
    sideHeaders: {
        height: 20,
        width: 20,
        alignItems: 'flex-end',
        marginTop: 10,
        backgroundColor: colors.MainGray
    }
})


const MainNavigator = StackNavigator({ //this will be "createStackNavigator" after upgrading react-navigation
    RegAssetSplashTest: { screen: RegAssetSplashTest },
    ComponentTest: { screen: ComponentTest },
    Login: { screen: Login },
    MenuOptions: { screen: MenuOptions },
    NewAssetLanding: { screen: NewAssetLanding },
    NewAssetForm: { screen: NewAssetForm },
    NewAssetConfirm: { screen: NewAssetConfirm },

    HiprLanding: { screen: HiprLanding },
    HiprAssets: { screen: HiprAssets },
    HiprTransactions: { screen: HiprTransactions },
    Hipr: { screen: Hipr },

    BlockScanner: { screen: BlockScanner },
    TxSwiperContainer: { screen: TxSwiperContainer },

    TrackAssetList: { screen: TrackAssetList },
    TrackAssetOptions: { screen: TrackAssetOptions },

    SupplyChainAssetList: { screen: SupplyChainAssetList },
    SupplyChainTxRx: { screen: SupplyChainTxRx },
    SupplyChainReview: { screen: SupplyChainReview },
    ImageUpload: { screen: ImageUpload },
    Camera: { screen: Camera },
    DocUp: { screen: DocUp },
    EdiT: { screen: EdiT },
    MetricInput: { screen: MetricInput },
    Confirm: { screen: Confirm },

    QRCapture: { screen: QRCapture },
    QRCapture2: { screen: QRCapture2 },

    Wallet: { screen: Wallet },
    Settings: { screen: Settings },

    WebViewComponent: { screen: WebViewComponent },
    TxSwiper: { screen: TxSwiper },
    DocumentStorage: { screen: DocumentStorage },
    DocumentQRScanner: { screen: DocumentQRScanner },

}, {
        initialRouteName: 'RegAssetSplashTest',

        // initialRouteName: 'Login',
        navigationOptions: ({ navigation }) => ({
            // headerStyle: {
            //     textAlign: 'center',
            //     backgroundColor: "#091140",
            //     justifyContent: 'center',
            //     alignContent: 'center',

            // },
            headerStyle: styles.headerStyle,
            title: "Welcome",
            headerTitleStyle: styles.headerText,
            // headerTitleStyle: {
            //     color: 'white',
            //     marginHorizontal: 0,
            //     marginLeft: '22%'

            // },
            headerRight: <TouchableHighlight style={styles.sideHeaders} onPress={() => navigation.navigate("Settings")}>
                <Icon name='heart' size={18} color={colors.MainGold} />
            </TouchableHighlight>
            ,
            headerLeft: <TouchableHighlight style={[styles.sideHeaders, styles.backArrow]} onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={18} color={colors.MainGold} />
            </TouchableHighlight>



            //     headerTitle:
            //         <View style={headerStyles.header__container}>
            //             <View style={headerStyles.header__container__centeredBox}>
            //                 <View style={headerStyles.header__image__box}>
            //                     {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
            //                     </TouchableHighlight> */}
            //                     <Image
            //                         style={headerStyles.assetHeaderLogo}
            //                         source={roundImage}
            //                     />
            //                 </View>
            //                 <View style={headerStyles.header__text__box}>
            //                     <Text style={headerStyles.headerText}>Main Options </Text>
            //                 </View>
            //             </View>
            //         </View>,

            //     headerStyle: {
            //         height: Platform.OS === 'android' ? 60 : 100,
            //         backgroundColor: 'white',

            //     },
            //     headerTitleStyle: {
            //         marginTop: Platform.OS === 'android' ? 20 : 0,
            //         textAlign: 'center',
            //         textAlignVertical: 'center',
            //         backgroundColor: 'white',
            //         alignSelf: 'center',

            //     },
            //     headerRight: <TouchableHighlight onPress={() => navigation.navigate("Settings")}>
            //     <Image source={DrawerIcon} style={styles.drawerIcon} />
            //   </TouchableHighlight>
            //   ,
            //     headerLeft: <TouchableHighlight onPress={() => navigation.goBack()}>
            //         <Image source={backArrow} style={styles.backArrow} />
            //     </TouchableHighlight>

        })
    })

export default MainNavigator;
