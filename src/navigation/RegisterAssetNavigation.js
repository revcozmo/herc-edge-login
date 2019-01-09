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
import { CreateStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../assets/colorConstants";
import RegHeader from "../components/RegisterAssetComponents/RegisterAssetHeader";

import ComponentTest from "../screens/ComponentTest";
import RegAssetSplashTest from "../screens/RegAssetSplashTest";
import RegAssetTest from "../screens/RegAssetTest";

const RegisterAssetNavigator = CreateStackNavigator({
    RegAssetSplashTest: { screen: RegAssetSplashTest },
    ComponentTest: { screen: ComponentTest },
    RegAssetTest: { screen: RegAssetTest }
},
{
    initalRoutName: 'RegAssetSplashTest',

    navigationOptions: ({ navigation }) => ({
        header: <RegHeader />
    })
}
)
