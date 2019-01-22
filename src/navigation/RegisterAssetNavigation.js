import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import colors from "../assets/ColorConstants";
import Header from "../components/Headers/Header";

// import ComponentTest from "../screens/ComponentTest";
import RegAssetSplash1 from "../screens/FramedScreens/RegAssetSplash_Draft_1";
import RegAsset1 from "../screens/FramedScreens/RegAsset_1_Draft_1";

const RegisterAssetNavigator = createStackNavigator(
    {
        RegAssetSplash1: { 
            screen: RegAssetSplash1,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={"Register Asset1"} navigation={navigation} />
            })
        
        },
        RegAsset1: { 
            screen: RegAsset1,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={'Register Asset2'} navigation={navigation} />
            })
            
        }
    },
   {
        initalRoutName: 'RegAssetSplash1',
        headerMode: 'none',
       
    }

    );


export default RegisterAssetNavigator;