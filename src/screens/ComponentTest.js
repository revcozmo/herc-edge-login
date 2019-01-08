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
import RegisterAssetPassword, { RegisterAssetInput } from "../components/RegisterAssetComponents/RegisterAssetInputs";
import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"


export default class ComponentTest extends Component {

    static navigationOptions = {

        header: <RegisterAssetHeader />
    }

    constructor(props) {
        super(props);
        console.log("componentTest")
        this.state={
            showPass: true
        }
    }

    onChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            testText: pwChar
        });
    }

    onHideShow = () => {
        console.log("hidingshow")
        this.setState({
            showPass: !this.state.showPass
        })
    }

    render() {
        console.log(this.Dims)
        return (

            <View style={localStyles.container}>
                <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
            </Icon.Button>


                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                />
                <Icon name='eye' size={18} color={colorConstants.MainGold} />
                <RegisterAssetInput dims={this.Dims} placeholder={'hello'} />

                <View style={localStyles.PasswordInputContainer}>
                    <Text style={styles.passwordInputlabel}>MainGray!!!!</Text>
                    <RegisterAssetPassword placeholder='SecondplaceholderTest' onChange={this.onChange} />

                </View>

                    <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
                    </Icon.Button>



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
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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