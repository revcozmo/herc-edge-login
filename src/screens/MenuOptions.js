import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Alert,
    YellowBox
} from "react-native";
import { StackNavigator } from "react-navigation";
import hiprBtn from "../components/buttons/validate.png";
import supplyChain from "../components/buttons/supplyChainButton.png";
import digiView from "../components/buttons/digitalViewerButton.png";
import track from "../components/buttons/trackButton.png";
import wallet from "../components/buttons/walletButton.png";
import settings from "../components/buttons/settingsButton.png";
import registerAsset from "../components/buttons/registerAssetButton.png"
import profileButton from "../components/buttons/profileButton.png"

import styles from "../assets/styles";
import { connect } from "react-redux";
import { getHercId, getAssets } from "../actions/AssetActions";
import store from "../store";
import Wallet from "./Wallet";
import firebase from '../constants/Firebase';
const rootRef = firebase.database().ref();

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);


class MenuOptions extends Component {

    componentDidMount() {
        this.props.getHercId();
        this.props.getAssets(this.props.userName);
        console.log(store.getState().AssetReducers.ethereumAddress, "chance ethereumAddress")
        console.log(store.getState().AssetReducers.auth_token, "chance auth_token")
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingTop: 25 }]}>

                    <View style={localStyles.touchableHighlight}>
                        <TouchableHighlight onPress={() => navigate("Create")}>
                            <Image style={localStyles.menuButton} source={registerAsset} />
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("Splash1")}>
                        <Image style={localStyles.menuButton} source={supplyChain} />
                    </TouchableHighlight>

                    {/* <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("PreDigi")}>
                        <Image style={localStyles.menuButton} source={digiView} />
                    </TouchableHighlight> */}

                    <TouchableHighlight style={localStyles.touchableHighlight}
                        onPress={() => navigate("TransAssetList", { web3: this.web3 })}>
                        <Image style={localStyles.menuButton} source={track} />
                    </TouchableHighlight>

                    <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("PreHipr")}>
                        <Image style={localStyles.menuButton} source={hiprBtn} />
                    </TouchableHighlight>


                    {/* <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("Wallet")}>
                        <Image style={localStyles.menuButton} source={wallet} />
                    </TouchableHighlight>

                    <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("Profile")}>
                        <Image style={localStyles.menuButton} source={profileButton} />
                    </TouchableHighlight> */}

                    {/* <TouchableHighlight style={localStyles.touchableHighlight} onPress={() => navigate("Settings")}>
                        <Image style={localStyles.menuButton} source={settings} />
                    </TouchableHighlight> */}

                    <Text style={{ color: "#f3c736", alignSelf: "flex-end", fontSize: 8 }}>
                        V.0.2.9
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.AssetReducers.edge_account
})

const mapDispatchToProps = dispatch => ({
    getHercId: () => dispatch(getHercId()),
    getAssets: (name) => dispatch(getAssets(name))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuOptions);

const localStyles = StyleSheet.create({
    touchableHighlight: {
        width: 200,
        height: 60,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    menuButton: {

        height: 60,
        width: 200,
        resizeMode: "contain",
        borderRadius: 2,
    },

})
