import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  WebView,
  ScrollView,
  Dimensions
} from "react-native";
import styles from "../assets/styles";
import { connect } from "react-redux";
import round from "../assets/round";

class BlockScanner extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let headerStyles = StyleSheet.create({
      header__container: {
        display: "flex",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20
      },
      header__container__centeredBox: {
        height: "100%",
        alignItems: "center",
        flexDirection: "row"
      },
      header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12
      },
      header__image__box: {
        height: "100%",
        borderRadius: 100
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2
      }
    });

    return {
      headerTitle: (
        <View style={headerStyles.header__container}>
          <TouchableHighlight
            style={{ justifyContent: "center" }}
            onPress={() => navigation.navigate("MenuOptions")}
          >
            <View style={headerStyles.header__container__centeredBox}>
              <View style={headerStyles.header__image__box}>
                {/* <Image
                  style={headerStyles.assetHeaderLogo}
                  source={{ uri: params.logo }}
                /> */}
              </View>
              <View style={headerStyles.header__text__box}>
                {/* <Text style={headerStyles.headerText}>{params.name}</Text> */}
                <Text>BlockScanner</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      block: null
    };
  }

  render() {
    let screenHeight = Dimensions.get("window").height;
    return (
      <View style={localStyles.container}>
        {/* <WebViewrr
            source={{uri: 'https://etherscan.io/token/0x6251583e7d997df3604bc73b9779196e94a090ce'}}
            style={localStyles.webview}
            automaticallyAdjustContentInsets= {false}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          /> */}
        <ScrollView style={{ flex: 1 }}>
          <View
            style={[localStyles.contentContainerA, { height: screenHeight }]}
          >
            <View style={localStyles.contentContainerA_Box}>
              <View style={localStyles.contentContainerA_Box_TopRow}>
                <Text style={{ color: "silver", margin: 10, fontSize: 12 }}>
                  {" "}
                  MARKET CAP OF $13.537 BILLION{" "}
                </Text>
              </View>
              <View style={{borderColor: "red", borderWidth: 3, width: "50%", alignSelf: "center" }}>
                <View style={localStyles.contentContainerA_Box_SecRow}>
                  <Image source={round} style={{width: 20}} />
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    $0.453
                  </Text>
                  <Text
                    style={{
                      color: "rgb(127,209,39)",
                      fontSize: 12,
                      // marginHorizontal: 20,
                      fontWeight: "normal"
                    }}
                  >
                    3.23 %
                  </Text>
                </View>
                <View style={localStyles.contentContainerA_Box_SecRow}>
                  <Text style={{ color: "rgb(120,136,229)", textAlign: "center", alignSelf: "center" }}>
                    @ 0.03243 BTC/Herc{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[localStyles.contentContainerB, { height: screenHeight }]}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Web3Reducers.data,
  isFetching: state.Web3Reducers.isFetching,
  isFetched: state.Web3Reducers.isFetched
});

const mapDispatchToProps = dispatch => ({
  // fetchContract: (abi) => dispatch(fetchContract(abi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockScanner);

const localStyles = StyleSheet.create({
  headerField: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  contentContainerA: {
    // alignContent: "center",
    // justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    alignSelf: "center",

    // height: {screenHeight},
    backgroundColor: "rgb(11,22,88)"
  },
  contentContainerA_Box: {
    marginTop: "10%",
    // flex: 2,
    alignSelf: "center",
    // borderColor: "orange",
    // borderWidth: 3,
    width: "95%",
    height: 200,
    backgroundColor: "rgb(66,75,160)",
    borderRadius: 5
  },
  contentContainerA_Box_TopRow: {
    alignSelf: "center"
    // width: "90%",
    // borderColor: "white",
    // borderWidth: 3,
  },
  contentContainerA_Box_SecRow: {
    justifyContent: "space-around",
    alignSelf: "center",
    borderColor: "blue",
    borderWidth: 3,
    flexDirection: "row",
    width: "100%"
  },
  contentContainerB: {
    // alignContent: "center",
    width: "100%",
    alignSelf: "center",
    height: "100%"
  },
  hercLogoHeader: {
    height: 45,
    width: 45,
    borderRadius: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3
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
  createButton: {
    width: 150,
    height: 50,
    borderColor: "#f3c736",
    borderWidth: 1
  },
  imageButtons: {
    height: 40,
    width: 175,
    alignSelf: "center",
    margin: 7
  },
  webview: {
    flex: 1
  },
  container: {
    flex: 1
  }
});
