import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Modal,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../assets/styles";
import colorConstants from "../assets/ColorConstants";
import React, { Component } from 'react';
import RegisterAssetPassword, { RegisterAssetInput } from "../components/RegisterAssetComponents/RegisterAssetInputs";
// import RegisterAssetHeader from "../components/RegisterAssetComponents/RegisterAssetHeader"


export default class RegAssetTest extends Component {

    // static navigationOptions = {

    //     header: <RegisterAssetHeader />
    // }

    constructor(props) {
        super(props);
        console.log("componentTest")
        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
        }
    }

    onChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            testText: pwChar
        });
    }



    render() {
        console.log(this.Dims)
        return (
            <View style={localStyles.container}>

                <StatusBar

                    barStyle={'light-content'}
                    translucent={true}
                />
                {/* <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>

                </Icon.Button> */}
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Text>Modal1</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => console.log("showing the modale") && this.setState({ showModal1: !this.state.showModal1 })}>
                    <Icon name='eye' size={18} color={colorConstants.MainGold} />
                </TouchableHighlight>
                <RegisterAssetInput placeholder={'Asset Name'} />
                <View style={localStyles.inputContainer}>
                    <Text style={styles.inputlabel}>Asset Name</Text>
                    <RegisterAssetInput placeholder={'Name'} /> onChange={this.onChange} />

                </View>



                <View style={localStyles.inputContainer}>
                    <Text style={styles.inputlabel}>Asset Password</Text>
                    <RegisterAssetPassword placeholder='SecondplaceholderTest' onChange={this.onChange} />

                </View>

                <Icon.Button name="eye" backgroundColor="#3b5998" onPress={() => console.log("eyeball press")}>
                </Icon.Button>

            </View>
        )
    }

}
const localStyles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: colorConstants.MainGray,
    //     alignItems: "center",
    //     justifyContent: "center"
    //   },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#00000040'

    },
    activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalButton: {
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 2,
        borderWidth: 2,
    },
    wordsText: {
        textAlign: 'center',
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },

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
    inputLabel: {
        fontSize: 10,
        color: 'white'
    },
    inputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: colorConstants.MainSubCrownBlue
    }

})