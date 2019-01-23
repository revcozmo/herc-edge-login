import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import SupplyChainSplash from "../screens/Testing/SupplyChainSplash";
import SupplyChainSideChoice from "../screens/Testing/SupplyChainSideChoice";

const SupplyChainNavigator = createStackNavigator(
    {
        SupplyChainSplash: {
            screen: SupplyChainSplash,
        },

        SupplyChainSideChoice: {
            screen: SupplyChainSideChoice,
        }

    },
    {
        initialRouteName: 'SupplyChainSplash',
        headerMode: 'none',

    }


)

export default SupplyChainNavigator;