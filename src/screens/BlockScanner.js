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
import CustomModal from "../components/CustomModal";


const BigNumber = require('bignumber.js');

const axios = require("axios");

class TransactionList extends Component {
  state = {
    transactions: null
  };

  componentDidMount() {
    // this.fetchTransactions(this.props.id).then(this.refreshList);
    this.refreshTransactionList();
  }
  componentWillReceiveProps(props) {
    const { transactionList } = this.props;
    // const { refresh, id } = this.props;
    if (props.transactionList !== transactionList) {
      console.log(this.props);
      this.setState({ transactions: this.props.transactionList });
    }
  }
  refreshTransactionList = res =>
    this.setState({ transaction: this.props.transactionList });

  render() {
    return (
      <View>
        <Text>
          {this.state.transactions
            ? this.state.transactions.blockNumber
            : "nothing"}
        </Text>
      </View>
    );
  }
}

class BlockScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hercValue: null,
      marketCap: null,
      txQuantity: null,
      totalSupply: null,
      holdersCount: null,
      txnArr: [],
      transactionsLoaded: false
    };
  }

  componentDidMount = async () => {
    await this._justDoIt();
    await this._getMarketCapTotalSupply();
    await this._getHoldersCount();
    // this._getTxList_txQuantity()
    // this._getTransactionData();
    
    
    this.setState({ loaded: true }, console.log(this.state))
  };

  // _getTxQuantity = async () => {
  //   return fetch (
  //     "http://api.ethplorer.io/getAddressInfo/0x6251583e7d997df3604bc73b9779196e94a090ce?apiKey=freekey",
  //     {
  //       method: "GET"
  //     }
  //   ).then(response => response.json())
  //   .then(responseJson => {
  //     let responseObject = responseJson;
  //     let txQuantity =
  //     this.setState({ txQuantity: res })
  //     return (responseObject.countTxs)
  //   })
  // }

  _getHoldersCount = async () => {
    axios.get("http://api.ethplorer.io/getAddressInfo/0x6251583e7d997df3604bc73b9779196e94a090ce?apiKey=freekey")
    .then( result => {
      let holdersCount = result.data.tokenInfo.holdersCount;
      this.setState({ holdersCount })
    })
  }

  _getDynamicHercValue = async () => {
    axios
      .get(
        "https://chart.anthemgold.com/service-1.0-SNAPSHOT/PRICE?symbol=HERCCOMMERCIAL&range=MINUTE_5"
      )
      .then(result => {
        let highPrice = result.data.h;
        let shortenedResponse = parseFloat(highPrice).toFixed(3);
        this.setState({ hercValue: shortenedResponse });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getTxList_txQuantity = async () => {
    return axios
      .get(
        "https://api.etherscan.io/api?module=account&action=txlist&address=0x6251583e7d997df3604bc73b9779196e94a090ce&startblock=0&endblock=99999999&sort=asc&apikey=Z4A2NZUA58J7CJCEEE87872SCC82BI88W1"
      )
      .then(response => {
        let responseObject = response.data;
        let txQuantity = responseObject.result.length;
        let txList = responseObject.result;
        let lastTransaction = responseObject.result[txQuantity - 1];
        let lastBlock = lastTransaction.blockNumber;
        var i;
        let lastTenTxnHashs = [];
        for (i = 1; i < 11; i++) {
          lastTenTxnHashs.push(responseObject.result[txQuantity - i].hash);
        }
        this.setState({ lastBlock, txQuantity, lastTenTxnHashs });
        return lastTenTxnHashs;
      });
  };

  _getTransactionData = async hashes => {
    console.log("hashes", hashes);
    return new Promise( resolve => {
      let txnArr = [];

      hashes.map((curHash, ind) => {
        axios
         .get("http://api.ethplorer.io/getTxInfo/" + curHash + "?apiKey=freekey")
         .then(res => {
           let nice = res.data.operations[0];
           let height = res.data.blockNumber;
           let value = nice.value;
           let to = nice.to;
           let from = nice.from;
           // this.setState({
           //   ...this.state.txnArr,
           //   txnArr: [{ height: height, value: value, to: to, from: from }]
           // });
           // console.log(this.state);
          //  txnArr.push({to: to, from:from, value:value});

          this.setState(prevState => ({
            txnArr: [...prevState.txnArr, { to: to, from:from, value: value }]
          }))
         }).catch(err => console.error(err))
     })

    //  return txnArr;
    })

    // Promise.all(Mapping).then(res => console.log(res))

  //   console.log(txnArr, "txarr")
  //  this.setState({  txnArr: txnArr });
  //  return "bullshit"
  };

  _justDoIt = async () => {
    await this._getTxList_txQuantity()
      .then(hashes => {
        this._getTransactionData(hashes);
      }).then(res => console.log(res)).then(blah => this._getDynamicHercValue())
  };
  // .then(res => {
  //   let lastTenTxnHashs = res;
  //   console.log(lastTenTxnHashs)
  //   let txnArr = [];
  //   lastTenTxnHashs.map((curHash, ind) => {
  //     fetch(
  //       "http://api.ethplorer.io/getTxInfo/" + curHash + "?apiKey=freekey",
  //       {
  //         method: "GET"
  //       }
  //     )
  //       .then(res => {
  //         console.log(res)
  //         // debugger;
  //         let les = res;
  //         txnArr.push(les);
  //       });
  //   });
  //   this.setState({  txnArr: txnArr });
  //   return txnArr;
  //   // console.log(txnArr);
  // });
  // .then(res => {
  //   let yes = res;
  //   this.setState({ txnArr: yes })
  //   console.log(this.state.txnArr)
  // })

  _getMarketCapTotalSupply = async () => {
    axios
      .get("https://chart.anthemgold.com/bi-1.0-SNAPSHOT/Report")
      .then(response => {
        console.log(response);
        let marketCap = response.data.marketCapitalization;
        let supply = response.data.aggregateSupplies;
        let totalSupply = parseFloat(supply).toFixed(3);
        this.setState({ marketCap, totalSupply });
      })
      .catch(err => {
        console.log("erroring out here");
        console.error(err);
      });
  };

  _renderTransactions = () => {
    if (this.state.loaded) {
      console.log(this.state.txnArr);
      return this.state.txnArr.map((curr, ind) => {
        console.log("making it to line 206");
        let revalue = new BigNumber(curr.value).shiftedBy(-18);
        let fixedRevalue = revalue.toFixed(18);
        console.log(fixedRevalue)

        return (
          <View key={ind} style={{ flexDirection: "row", borderColor: "red", borderWidth: 3 }}>
            <Text style={[localStyles.transaction_Text]}>{curr.from}</Text>
            <Text style={localStyles.transaction_Text}>{curr.to}</Text>
            <Text style={localStyles.transaction_Text}>{fixedRevalue}</Text>
          </View>
        );
      });
    } else {
      return <Text style={{textAlign: "center" }}>LOADING</Text>;
    }
  };

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
            style={[localStyles.contentContainerA, { height: 400 }]}
          >
            <View style={localStyles.contentContainerA_MarketCapBox}>
              <View style={localStyles.contentContainerA_Box_TopRow}>
                <Text style={{ color: "silver", margin: 10, fontSize: 12 }}>
                  {" "}
                  {this.state.marketCap
                    ? "MARKET CAP OF $" + this.state.marketCap
                    : null}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  alignSelf: "center",
                  flexDirection: "row",
                  borderColor: "purple",
                  borderWidth: 3
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
                      // { width: 200 }
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.hercValue ? "$" + this.state.hercValue : null}
                    </Text>
                    {/* <Text
                      style={{
                        color: "rgb(102,245,7)",
                        fontSize: 12,
                        marginLeft: 20,
                        fontWeight: "normal"
                      }}
                    >
                      3.23 %
                    </Text> */}
                  </View>
                  {/* <View style={localStyles.contentContainerA_Box_SecRow}> */}
                    {/* <Text
                      style={{
                        color: "rgb(120,136,229)",
                        textAlign: "center",
                        alignSelf: "center"
                      }}
                    >
                      @ 0.03243 BTC/Herc{" "}
                    </Text> */}
                  {/* </View> */}
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
                    {this.state.lastBlock}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Transactions
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    {this.state.txQuantity
                      ? this.state.txQuantity.toLocaleString()
                      : null}
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
                    Total Supply
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    {this.state.totalSupply ? this.state.totalSupply : null}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    Holders Count
                  </Text>
                  <Text style={localStyles.contentContainerA_MarketCapBox_Text}>
                    {this.state.holdersCount ? this.state.holdersCount : null }
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={localStyles.contentContainerA_HercTransHistBox}> */}
              {/* <View>
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
              </View> */}
              {/* <View
                style={
                  localStyles.contentContainerA_HercTransHistBox_dateRangeRow
                }
              > */}
                {/* <TouchableHighlight
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
                </TouchableHighlight> */}
                {/* <TouchableHighlight
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
                </TouchableHighlight> */}
                {/* <TouchableHighlight
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
                </TouchableHighlight> */}
                {/* <TouchableHighlight
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
                </TouchableHighlight> */}
              {/* </View> */}
            {/* </View> */}
          </View>

          <View
            style={[localStyles.contentContainerB, { flex:1 }]}
          >
            <View style={localStyles.contentContainerB_TransactionsBox}>
              {/* <View style={localStyles.contentContainerA_MarketCapBox}> */}
              <View
                style={localStyles.rowContainingTransactionViewAll}
              >
                <TouchableHighlight
                  style={{
                    backgroundColor: "white",
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
                      fontSize: 12,
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
                  onPress={() => {
                    Linking.openURL("https://etherscan.io/token/0x6251583e7d997df3604bc73b9779196e94a090ce");
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
                  borderColor: "green",
                  borderWidth: 3,
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  From
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  To
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "black",
                    marginVertical: 10
                  }}
                >
                  Value
                </Text>
              </View>
              
              <View style={{ flexDirection: "column", borderColor: "blue", borderWidth: 3, marginBottom: 2 }}>
                {/* <TransactionList transactionList={ this.state.txnArr } /> */}
               
                {this._renderTransactions()}
                
              </View>
              
            </View>
            <View style={localStyles.contentContainerB_FooterBox}>
              <View style={{ marginTop: 20 }}>
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
                    style={{
                      color: "silver",
                      marginHorizontal: 5,
                      fontWeight: "bold"
                    }}
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
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://herc.one/metamask");
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
                    Metamask
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://herc.one/faq");
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
                    F.A.Q.
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={{ marginTop: 10 }}>
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
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://herc.one/#team-section");
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
                    Team
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://herc.one/#the-roadmap-section");
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
                    Roadmap
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL(
                      "https://s3.us-east-2.amazonaws.com/hercmedia/herc_2018_whitepaper.pdf"
                    );
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
                    Whitepaper
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  CONNECT
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL(
                      "https://t.me/joinchat/E_FZdg4HNKlqnxKXEEeYxw"
                    );
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
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://discord.gg/ntWZ53W");
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
                    Discord
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL("https://github.com/HERCone");
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
                    Github
                  </Text>
                </TouchableHighlight>
              </View>
              {/* <View style={{ marginTop: 10 }}>
                <Text
                  style={{ color: "black", fontWeight: "bold", marginLeft: 5 }}
                >
                  SUBSCRIBE
                </Text>
              </View> */}
              {/* <View style={{ flexDirection: "row", marginTop: 5 }}> */}
                {/* <TextInput
                  style={{
                    borderColor: "gray",
                    width: "75%",
                    alignSelf: "center",
                    backgroundColor: "rgb(245,247,253)"
                  }}
                  placeholder="Your email"
                  underlineColorAndroid="transparent"
                /> */}
                {/* <TouchableHighlight
                  style={{
                    backgroundColor: "#7888e5",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignContent: "center",
                    marginVertical: 2,
                    height: 30,
                    alignSelf: "center"
                  }}
                > */}
                  {/* <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontWeight: "bold",
                      marginHorizontal: 20,
                      fontSize: 10
                    }}
                  >
                    Subscribe
                  </Text> */}
                {/* </TouchableHighlight> */}
              {/* </View> */}
            </View>
          </View>
          <View>
            <Text style={localStyles.copyrightText}>
              COPYRIGHT 2018 Hercules SEZC - All Rights Reserved.
            </Text>
          </View>
          {/* <View>
            <CustomModal/>
          </View> */}
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
    borderColor: "yellow",
    borderWidth: 3,
    marginTop: "12%",
    // flex: 2,
    alignSelf: "center",
    width: "95%",
    height: 300,
    backgroundColor: "#7888e5",
    borderRadius: 5
  },
  contentContainerA_Box_TopRow: {
    borderColor: "orange",
    borderWidth: 3,
    marginTop: 10,
    alignSelf: "center"
  },
  contentContainerA_Box_SecRow: {
    borderColor: "red",
    borderWidth: 3,
    // justifyContent: "space-around",
    // alignSelf: "center",
    // flexDirection: "row"
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
    borderColor: "orange",
    borderWidth: 3,
    backgroundColor: "#f2f3fb",
    // alignContent: "center",
    width: "100%",
    alignSelf: "center"
    // height: "100%"
  },
  contentContainerB_TransactionsBox: {
    flexDirection: "column",
    borderColor: "purple",
    borderWidth: 3,
    marginTop: "12%",
    // flex: 1,
    alignSelf: "center",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 350
  },
  contentContainerB_FooterBox: {
    flexDirection: "column",
    borderColor: "purple",
    borderWidth: 3,
    marginTop: "12%",
    // flex: 1,
    alignSelf: "center",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5
  },
  rowContainingTransactionViewAll: {
    borderColor: "yellow",
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
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
  },
  purpleHorizontalTransaction: {
    flexDirection: "row",
    // marginVertical: 10,
    // marginTop: "10%",
    justifyContent: "space-around",
    backgroundColor: "#f2f3fb"
  },
  transaction_Text: {
    fontSize: 10,
    color: "black",
    margin: 2,
    flex: 1,
    height: 14,
    textAlign: "center"
  }
});
