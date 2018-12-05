import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
  StyleSheet,
  WebView
} from "react-native";
import styles from "../assets/styles";
import { connect } from "react-redux";

import JSONTree from "react-native-json-tree";

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
                <Image
                  style={headerStyles.assetHeaderLogo}
                  source={{ uri: params.logo }}
                />
              </View>
              <View style={headerStyles.header__text__box}>
                <Text style={headerStyles.headerText}>{params.name}</Text>
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

  componentDidMount() {
    console.log(this.props.data, "this should be the block");
  }
  render() {
    // let block = this.props.data ? this.props.data :  null;
    return (
      <View style={{flex: 1}}>
        
          {/* <Text style={{ color: "white", height: 30, fontSize: 20 }}>
            Main NET Latest Block
        </Text>

          {this.props.data && (
            <ScrollView style={{ paddingLeft: 10 }}>
              <JSONTree data={this.props.data} theme={theme} invertTheme={false} />
            </ScrollView>
          )} */}
          <WebView
            source={{uri: 'https://etherscan.io/token/0x6251583e7d997df3604bc73b9779196e94a090ce'}}
            style={localStyles.webview}
            automaticallyAdjustContentInsets= {false}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        
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
    // resizeMode: "contain"
  },
  imageButtons: {
    height: 40,
    width: 175,
    // resizeMode: "contain",
    alignSelf: "center",
    margin: 7
  },
  webview: {
    // marginTop: 20,
    // maxHeight: 200,
    // width: "100%",
    flex: 1
  }
});
