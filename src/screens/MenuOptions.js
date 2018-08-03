import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import hiprBtn from "../components/buttons/validate.png";
// import create from "../components/buttons/create.png";
import supplyChain from "../components/buttons/supplyChainButton.png";
import digiView from "../components/buttons/digitalViewerButton.png";
import track from "../components/buttons/trackButton.png";
import wallet from "../components/buttons/walletButton.png";
import settings from "../components/buttons/settingsButton.png";
import registerAsset from "../components/buttons/registerAssetButton.png"
import profileButton from "../components/buttons/profileButton.png"

import styles from "../assets/styles";
import { connect } from "react-redux";
import { getHercId, fetchAssets } from "../actions/AssetActions";
import Wallet from "./Wallet";

class MenuOptions extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getHercId();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingTop: 25 }]}>

                    <View style={localStyles.touchableHighlight}>
                        <TouchableHighlight onPress={() => navigate("Create")}>
                            <Image style={localStyles.menuButton}  source={registerAsset} />
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

const mapDispatchToProps = dispatch => ({
    fetchAssets: () => dispatch(fetchAssets()),
    getHercId: () => dispatch(getHercId())
    //  fetchData: () => dispatch(fetchData())
});
export default connect(
    null,
    mapDispatchToProps
)(MenuOptions);

const localStyles = StyleSheet.create({
    touchableHighlight: {
        width: 200,
        height: 60,
        marginTop: 5,
        marginBottom: 5,
        // borderColor: "red",
        // borderWidth: 3,
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