import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  WebView,
  ScrollView,
  Dimensions,
  TextInput,
  Linking
} from "react-native";
import styles from "../assets/styles";
import { connect } from "react-redux";
import round from "../assets/round.png";

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
            <View style={localStyles.contentContainerA_MarketCapBox}>
              <View style={localStyles.contentContainerA_Box_TopRow}>
                <Text style={{ color: "silver", margin: 10, fontSize: 12 }}>
                  {" "}
                  MARKET CAP OF $13.537 BILLION{" "}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  alignSelf: "center",
                  flexDirection: "row"
                }}
              >
                <Image
                  source={round}
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                />
                <View>
                  <View
                    style={[
                      localStyles.contentContainerA_Box_SecRow,
                      { width: 200 }
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold"
                      }}
                    >
                      $0.453
                    </Text>
                    <Text
                      style={{
                        color: "rgb(102,245,7)",
                        fontSize: 12,
                        marginLeft: 20,
                        fontWeight: "normal"
                      }}
                    >
                      3.23 %
                    </Text>
                  </View>
                  <View style={localStyles.contentContainerA_Box_SecRow}>
                    <Text
                      style={{
                        color: "rgb(120,136,229)",
                        textAlign: "center",
                        alignSelf: "center"
                      }}
                    >
                      @ 0.03243 BTC/Herc{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Last Block
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    6939883 (14.5s)
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Transactions
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    36433 M (6.8 TPS)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: "8%",
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Hash Rate
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    172.204.85 GH/s
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Network Difficulty
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    2,239.23 TH
                  </Text>
                </View>
              </View>
            </View>
            <View style={localStyles.contentContainerA_HercTransHistBox}>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 10,
                    marginLeft: 25
                  }}
                >
                  {" "}
                  HERC Transaction History{" "}
                </Text>
              </View>
              <View
                style={
                  localStyles.contentContainerA_HercTransHistBox_dateRangeRow
                }
              >
                <TouchableHighlight
                  style={
                    localStyles.contentContainerA_HercTransHistBox_dateRangeRow_touchable
                  }
                >
                  <Text
                    style={
                      localStyles.contentContainerA_HercTransHistBox_dateRangeRow_text
                    }
                  >
                    Year
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={
                    localStyles.contentContainerA_HercTransHistBox_dateRangeRow_touchable
                  }
                >
                  <Text
                    style={
                      localStyles.contentContainerA_HercTransHistBox_dateRangeRow_text
                    }
                  >
                    Month
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={
                    localStyles.contentContainerA_HercTransHistBox_dateRangeRow_touchable
                  }
                >
                  <Text
                    style={
                      localStyles.contentContainerA_HercTransHistBox_dateRangeRow_text
                    }
                  >
                    Week
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={
                    localStyles.contentContainerA_HercTransHistBox_dateRangeRow_touchable
                  }
                >
                  <Text
                    style={
                      localStyles.contentContainerA_HercTransHistBox_dateRangeRow_text
                    }
                  >
                    Day
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View
            style={[localStyles.contentContainerB, { height: screenHeight }]}
          >
            <View style={localStyles.contentContainerB_BlocksBox}>
              {/* <View style={localStyles.contentContainerA_MarketCapBox}> */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20
                }}
              >
                <TouchableHighlight
                  style={{
                    backgroundColor: "rgb(241,243,252)",
                    borderRadius: 2,
                    marginLeft: "1%",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginHorizontal: 10,
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "rgb(122,138,229)"
                    }}
                  >
                    Blocks
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    backgroundColor: "rgb(241,243,252)",
                    borderRadius: 2,
                    marginLeft: "5%",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginHorizontal: 10,
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "black"
                    }}
                  >
                    Transactions
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    backgroundColor: "white",
                    borderColor: "silver",
                    borderWidth: 1,
                    borderRadius: 20,
                    marginLeft: "8%",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "white",
                      marginHorizontal: 24,
                      marginVertical: 6,
                      color: "black",
                      fontSize: 12
                    }}
                  >
                    View all
                  </Text>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  Height
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  Age
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  txn
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // marginVertical: 10,
                  // marginTop: "10%",
                  justifyContent: "space-around",
                  backgroundColor: "#f2f3fb"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "rgb(152,164,234)",
                    marginVertical: 10
                  }}
                >
                  6943229
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  28 secs ago
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  223
                </Text>
              </View>
            </View>
            <View style={localStyles.contentContainerB_BlocksBox}>
              <View
                style={{ marginTop: 20}}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  {" "}
                  HERC
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://herc.one/policy");
                  }}
                >
                  <Text
                    style={{ color: "silver", marginHorizontal: 5, fontWeight: "bold" }}
                  >
                    {" "}
                    Privacy Policy
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
              onPress={() => {
                Linking.openURL("https://herc.one/terms");
              }}
            >
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Terms Of Use
                </Text>
                </TouchableHighlight>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Metamask
                </Text>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  F.A.Q.
                </Text>
              </View>
              <View
                style={{ marginTop: 10}}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  COMPANY
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
              <TouchableHighlight
                onPress={() => {
                  Linking.openURL("https://purchase.herc.one");
                }}
              >
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Buy HERC
                </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                  Linking.openURL("https://herc.one/#team-section");
                }}>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Team
                </Text>
                </TouchableHighlight>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Roadmap
                </Text>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Whitepaper
                </Text>
              </View>
              <View
                style={{ marginTop: 10}}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  CONNECT
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
              <TouchableHighlight
              onPress={() => {
                Linking.openURL("https://t.me/joinchat/E_FZdg4HNKlqnxKXEEeYxw");
              }}
            >
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Telegram
                </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
              Linking.openURL("https://discord.gg/ntWZ53W");
            }}>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Discord
                </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                  Linking.openURL("https://github.com/HERCone");
                }}>
                <Text
                  style={{
                    color: "silver",
                    marginHorizontal: 5,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  Github
                </Text>
                </TouchableHighlight>
              </View>
              <View
                style={{ marginTop: 10}}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  SUBSCRIBE
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TextInput
                  style={{
                    borderColor: "gray",
                    width: "75%",
                    alignSelf: "center",
                    backgroundColor: "rgb(245,247,253)"
                  }}
                  placeholder="Your email"
                  underlineColorAndroid="transparent"
                />
                <TouchableHighlight
                  style={{
                    backgroundColor: "#7888e5",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignContent: "center",
                    marginVertical: 2,
                    height: 30,
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontWeight: "bold",
                      marginHorizontal: 20,
                      fontSize: 10
                    }}
                  >
                    Subscribe
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View>
            <Text style={localStyles.copyrightText}>
              COPYRIGHT 2018 Hercules SEZC - All Rights Reserved.
            </Text>
          </View>
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
  contentContainerA_MarketCapBox: {
    marginTop: "12%",
    // flex: 2,
    alignSelf: "center",
    width: "95%",
    height: "40%",
    backgroundColor: "#7888e5",
    borderRadius: 5
  },
  contentContainerA_Box_TopRow: {
    marginTop: 10,
    alignSelf: "center"
  },
  contentContainerA_Box_SecRow: {
    justifyContent: "space-around",
    alignSelf: "center",
    flexDirection: "row"
  },
  contentContainerA_MarketCapBox_Text: {
    color: "white",
    marginLeft: 20,
    marginVertical: 5,
    fontSize: 12
  },
  contentContainerA_HercTransHistBox: {
    marginTop: "12%",
    // flex: 2,
    alignSelf: "center",
    width: "95%",
    height: "40%",
    backgroundColor: "rgb(29,30,102)",
    borderRadius: 5
  },
  contentContainerA_HercTransHistBox_dateRangeRow: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 10
  },
  contentContainerA_HercTransHistBox_dateRangeRow_touchable: {
    backgroundColor: "rgb(51,54,117)",
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 10
  },
  contentContainerA_HercTransHistBox_dateRangeRow_text: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 1
  },
  contentContainerB: {
    backgroundColor: "#f2f3fb",
    // alignContent: "center",
    width: "100%",
    alignSelf: "center"
    // height: "100%"
  },
  contentContainerB_BlocksBox: {
    marginTop: "12%",
    // flex: 2,
    alignSelf: "center",
    width: "95%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 5
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
  },
  copyrightText: {
    fontSize: 12,
    alignSelf: "center",
    color: "black"
  }
});
