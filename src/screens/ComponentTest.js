import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../assets/styles";
import colorConstants from "../assets/colorConstants";
import React, { Component } from 'react';
import RegisterAssetInputComponent from "../components/RegisterAssetComponents/NewAssetPropInput";
import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"
import { white } from 'ansi-colors';
import  MainColors  from '../assets/colorConstants';


export default class ComponentTest extends Component {

    static navigationOptions =  {
        
        header: <RegisterAssetHeader />
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={localStyles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                />
                <RegisterAssetInputComponent placeholder="placeholderTest" />

                <RegisterAssetInputComponent placeholder="SecondplaceholderTest" />


                <Text style={styles.headerText}>MainGray!!!!</Text>

            </View>
        )
    }

}
const localStyles = StyleSheet.create({

    container: {
        width: '100%',
        // backgroundColor: colorConstants.MainBlue,
        backgroundColor: colorConstants.MainGray,
        alignItems: "center",
        justifyContent: "center"
    },

})