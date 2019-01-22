
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import RegHeader from "../components/Headers/Header";

import RegAssetSplash1 from "../screens/FramedScreens/RegAssetSplash_Draft_1";
import RegAsset1 from "../screens/FramedScreens/RegAsset_1_Draft_1";
import RegAsset2 from "../screens/Testing/RegAsset_2_Draft_1";
const RegisterAssetNavigator = createStackNavigator(
    {
        RegAssetSplash1: {
            screen: RegAssetSplash1,
            
        },
        RegAsset1: {
            screen: RegAsset1,

        },
        RegAsset2: {
            screen: RegAsset2
        }
    },
    {
        initalRoutName: 'RegAsset2',
        headerMode: 'none',
        // navigationOptions: ({ navigation }) => ({
        //     header: <RegHeader headerTitle={"Register Asset"} params={goBackTo = 'RegAssetSplash1'} navigation={navigation} />
        // })

    }

);


export default RegisterAssetNavigator;
