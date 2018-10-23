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
// import Web3 from "web3";

 class BlockScanner extends Component {
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
      block: this.props.data
    }
  }

  componentDidMount() {
console.log(this.props.data, "this should be the block")
  }
  render() {
    // let block = this.props.data ? this.props.data :  null;
    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <Text style={{ color: "white", height: 30, fontSize: 20 }}>
            POC Ropsten TestNet Latest Block
        </Text>

          {this.state.block && (
            <ScrollView style={{ paddingLeft: 10 }}>
              <JSONTree data={this.state.block} theme={theme} invertTheme={false} />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  data: state.EthReducers.data,
  isFetching: state.EthReducers.isFetching,
  isFetched: state.EthReducers.isFetched
})

const mapDispatchToProps = (dispatch) => ({
  
  // fetchContract: (abi) => dispatch(fetchContract(abi))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockScanner);
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