import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableHighlight, Alert, Button } from 'react-native';
import submit from "../components/buttons/submit.png";
import logo from "../assets/round.png";
import { connect } from "react-redux";
import styles from "../assets/styles";
import hercPillar from "../assets/hercLogoPillar.png";
import { incHercId, confirmAsset } from "../actions/AssetActions"

class NewAssetConfirm extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle:
            {
              justifyContent: "space-around"
            },
            headerTitle: (
                <View style={localStyles.headerField}>
                    <Image
                        style={localStyles.hercLogoHeader}
                        source={logo}
                    />
                    <Text style={localStyles.registerHeaderText}>Register</Text>
                </View>
            )
        }
    }

    _onPressSubmit() {
        let hercId = this.props.hercId;
        const { navigate } = this.props.navigation;
        let newAsset = Object.assign({}, this.props.newAsset, {
            ...this.props.newAsset,
            hercId
        })

        this.props.incHercId(hercId);
        this.props.confirmAsset(newAsset);

        navigate('MenuOptions');
    }

    render() {
        const { navigate } = this.props.navigation;
        let price = this.state.fctPrice;
        let hercId = this.props.hercId;
        let newAsset = this.props.newAsset;
        let Logo, Url, list;
        let Name = newAsset.Name;

        if (newAsset.Logo) {
            Logo = (<Image style={styles.assetHeaderImage} source={{ uri: newAsset.Logo }} />);
          } else {
              Logo = (<Text style={styles.label}>No Image</Text>)
          }


        if (newAsset.hasOwnProperty('Url')) {
            Url = (<Text style={styles.label}>{newAsset.Url}</Text>);
          } else {
            Url = (<Text style={styles.label}>No Url</Text>)
          }

        if (newAsset.hasOwnProperty('CoreProps')) {
            list = Object.getOwnPropertyNames(newAsset.CoreProps).map((x, i) => {
                let num = (i + 1);
                return (
                    <View key={i} style={localStyles.assetMetricInputField}>
                        <Text style={localStyles.text}>Metric: {num}</Text>
                        <Text style={localStyles.input}>{x}</Text>
                    </View>
                )
            })
        } else {
            list = (<Text style={styles.label}>No Properties</Text>)
        }



        return (
            <View style={styles.container}>
                <View style={styles.containerCenter}>
                    <Text style={styles.assetHeaderLabel}>{Name}</Text>
                    {Logo}
                    <Text style={styles.assetHeaderLabel}>{Url}</Text>
                    <Text style={styles.assetHeaderLabel}>HercID: {hercId}</Text>
                    <ScrollView style={{ paddingRight: 5, alignSelf: "center", width: "100%" }}>

                        {list}

                    </ScrollView>

                    <TouchableHighlight onPress={() => this._onPressSubmit()}>
                        <Image source={submit} style={localStyles.imageButtons} />
                    </TouchableHighlight>

                    <View style={localStyles.newAssetFeeContainer}>
                        <Image style={localStyles.assetFeePillarLogo} source={hercPillar} />
                        <Text style={localStyles.assetFeePrice}>10,000</Text>
                    </View>

                </View>
            </View>

        )
    }
}


const mapStateToProps = (state) => ({
    newAsset: state.AssetReducers.newAsset,
    hercId: state.AssetReducers.hercId
});

const mapDispatchToProps = (dispatch) => ({
    confirmAsset: (asset) =>
        dispatch(confirmAsset(asset)),

    incHercId: (hercid) =>
        dispatch(incHercId(hercid))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewAssetConfirm);


const localStyles = StyleSheet.create({
    headerField: {
        flexDirection: "row",
        width: 200,
        justifyContent: "space-around",
        alignItems: "center"
    },
    hercLogoHeader: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 3,
    },
    registerHeaderText: {
        fontFamily: "dinPro",
        height: 50,
        fontSize: 30,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    assetMetricInputField: {
        height: 40,
        flexDirection: "row",
        width: "100%",
        borderColor: "blue",
        justifyContent: "space-between",
        margin: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 5,
        fontFamily: "dinPro"
    },
    input: {
        width: "53%",
        height: 24,
        textAlign: "center",
        backgroundColor: "#ffffff",
        fontSize: 16,
        fontWeight: "200",
        borderColor: "blue",
        color: "black",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 3
    },
    imageButtons: {
        height: 40,
        width: 175,
        resizeMode: "contain",
        alignSelf: "center",
        margin: 7
    },

    newAssetFeeContainer: {
        height: 50,
        width: 125,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    assetFeePillarLogo: {
        height: 40,
        width: 30,
        backgroundColor: "#091141",
        resizeMode: "contain",
    },
    assetFeePrice: {
        backgroundColor: "#091141",
        textAlign: "center",
        fontSize: 20.2,
        fontWeight: "400",
        color: "white",
        height: 30
    },
    wordsText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "white"
      },
      yellowText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "yellow"
      }
})
