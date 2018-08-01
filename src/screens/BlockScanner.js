import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { STATUS_BAR_HEIGHT } from "../constants";
import styles from "../assets/styles";
import { connect } from "react-redux";

import JSONTree from "react-native-json-tree";
// import Web3 from "../constants/web3";

export default class BlockScanner extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: (
        <View style={styles.assetHeaderTitle}>
          <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
            <Image
              style={styles.assetHeaderLogo}
              source={{ uri: params.logo }}
            />
          </TouchableHighlight>
          <Text style={styles.headerText}>{params.name}</Text>
        </View>
      ),
      // headerTitleStyle: {
      //   height: 50,
      //   width: 200,
      //   alignSelf: "center",
      //   justifyContent: "center",
      //   flexDirection: "row",
      //   marginLeft: 20
      // }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      block: { still: "loading" },
      isFetching: true

      // search: this.state.wallet
      // address: wallet
    };
  }

  // componentDidMount() {
  //   console.log(Web3, "webs");
  //   Web3.eth.getBlock("latest", (err, block) => {
  //     this.setState({
  //       block,
  //       isFetching: false
  //     });

      //   Web3.eth.defaultAccount = '0x1864a4327931f04B7FB489be97667FCE1B23223E';
      //   console.log(Web3.eth.defaultAccount);
      //   https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
  //   });
  // }
  render() {
    let block = this.state.block;
    console.log(this.state.isFetching, "fetching");
    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <Text style={{ color: "white", height: 30, fontSize: 20 }}>
            POC Ropsten TestNet Latest Block
        </Text>

          {!this.state.isLoading && (
            <ScrollView style={{ paddingLeft: 10 }}>
              <JSONTree data={block} theme={theme} invertTheme={false} />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const theme = {
  scheme: "monokai",
  author: "wimer hazenberg (http://www.monokai.nl)",
  base00: "#272822",
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#a6e22e",
  base0C: "#a1efe4",
  base0D: "#66d9ef",
  base0E: "#ae81ff",
  base0F: "#cc6633"
};

// const mapStateToProps = (state) => ({
//     // data: state.EthReducers.data,
//     isFetching: state.EthReducers.isFetching,
// isFetched: state.EthReducers.isFetched,
// fetchError: state.EthReducers.fetchError
// })

// const mapDispatchToProps = (dispatch) => ({
//     fetchBlock: () => dispatch(fetchBlock()),
// fetchContract: (abi) => dispatch(fetchContract(abi))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(BlockScanner);

// const localStyles = StyleSheet.create({

//     headerField: {
//         flexDirection: "row",
//         width: 200,
//         justifyContent: "space-around",
//         alignItems: "center"
//     },
//     hercLogoHeader: {
//         height: 45,
//         width: 45,
//         borderRadius: 45 / 2,
//         resizeMode: "contain",
//         alignSelf: "center",
//         marginBottom: 3,
//     },
//     registerHeaderText: {
//         fontFamily: "dinPro",
//         height: 50,
//         fontSize: 30,
//         alignSelf: "center",
//         fontWeight: "bold",
//         color: "black",
//         textAlign: "center"
//     },
//     createButton: {
//         width: 150,
//         height: 50,
//         borderColor: "#f3c736",
//         borderWidth: 1,


//         // resizeMode: "contain"
//     },
//     imageButtons: {
//         height: 40,
//         width: 175,
//         // resizeMode: "contain",
//         alignSelf: "center",
//         margin: 7

//     },
// })