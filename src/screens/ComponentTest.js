import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../assets/styles";
import colorConstants from "../assets/colorConstants";
import React, { Component } from 'react';
import {RegisterAssetInput, RegisterAssetPassword} from "../components/RegisterAssetComponents/RegisterAssetInputs";
import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"
import { white } from 'ansi-colors';
import MainColors from '../assets/colorConstants';


export default class ComponentTest extends Component {

    static navigationOptions = {

        header: <RegisterAssetHeader />
    }

    constructor(props) {
        super(props);
        console.log("componentTest")
        var {height, width} = Dimensions.get('window');
    }

    onChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            testText: pwChar
        });
    }

    render() {

        return (
            <View style={localStyles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                />

                <RegisterAssetInput placeholder={'hello'} />
                
                <View style={localStyles.PasswordInputContainer}>
                    <Text style={styles.passwordInputlabel}>MainGray!!!!</Text>
                    <RegisterAssetPassword placeholder="SecondplaceholderTest" onChange={this.onChange} />

                </View>




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
        justifyContent: "center",
        marginTop: 20,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
        },
    passwordInputLabel: {
        fontSize: 10,
        color: 'white'
    },
    passwordInputContainer: {
        
        justifyContent: 'flex-start',
        backgroundColor: colorConstants.MainSubCrownBlue
    }

})