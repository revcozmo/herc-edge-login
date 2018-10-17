import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, TouchableHighlight, Image, Picker, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { STATUS_BAR_HEIGHT } from '../constants';
import styles from '../assets/styles';
import { connect } from 'react-redux';
import { fetchBlock } from '../actions/EthActions';
import MagicButton from 'react-native-button';

class SpaceScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let headerStyles = StyleSheet.create({
            header__container: {
              // borderColor: "green",
              // borderWidth: 3,
              display: "flex",
            //   resizeMode: "contain",
              height: 80,
              alignSelf: "center",
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              marginTop: 40,
              paddingBottom: 20
      
            },
            header__container__centeredBox: {
              // borderColor: "purple",
              // borderWidth: 3,
              height: "100%",
              alignItems: "center",
              flexDirection: 'row'
            },
            header__text__box: {
              // borderColor: "blue",
              // borderWidth: 3,
              height: "100%",
              marginBottom: 5,
              marginLeft: 12,
              
            },
            header__image__box: {
              // borderColor: "yellow",
              // borderWidth: 3,
              height: "100%",
              borderRadius: 100
              // width: 50
            },
            assetHeaderLogo: {
              height: 35,
              width: 35,
              borderRadius: 50,
              // resizeMode: "contain",
            },
            headerText: {
              fontFamily: "dinPro",
              fontSize: 26,
              alignSelf: "center",
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              marginTop: 2,
              // paddingTop: 5
            },
          })

        return {
            headerTitle: (
                <View style={headerStyles.header__container}>
                <View style={headerStyles.header__container__centeredBox}>
                  <View style={headerStyles.header__image__box}>
                    {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
                   </TouchableHighlight> */}
                    <Image
                      style={headerStyles.assetHeaderLogo}
                      source={{ uri: params.logo }}
                    />
                  </View>
                  <View style={headerStyles.header__text__box}>
                    <Text style={headerStyles.headerText}>{params.name}</Text>
                  </View>
                </View>
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
        this.state = this.props.asset
    }

    componentDidMount() {
        this._checkProps();
    }

    _checkProps() {
        const { navigate } = this.props.navigation;
        this.state.selectedAsset.hasOwnProperty('transactions')
            ?
            this.setState({
                tx: <MagicButton style={localStyles.menuButton}

                    onPress={() => navigate('TransSwiper', { name: this.props.name, logo: this.props.logo })}>
                    Transaction Swiper
                    </MagicButton>
            })
            :
            this.setState({ tx: <Text style={styles.noTransLabel}>No Transactions</Text> });
    }

    _onPress = () => {

        console.log('pressing blockscanner in spacescreen')
        const { navigate } = this.props.navigation;
        this.props.fetchBlock();
        {this.state.EthReducers.data && navigate('BlockScanner', { name: this.props.asset.Name, logo: this.props.asset.Logo })}


    }

    render() {
        const { navigate } = this.props.navigation;
        console.log('spacescreen');



        // const { params } = navigation.state;
        // const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingTop: 25 }]}>
                    {this.state.tx}
                  
                    {/* <Button title={'Transaction Viewer'} onPress={() => navigate('TransSwiper', { name: this.props.name, logo: this.props.logo })} /> */}

                    <MagicButton styles={localStyles.menuButton} onPress={this._onPress}>Block Scanner</MagicButton>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    asset: state.AssetReducers.selectedAsset,
    name: state.AssetReducers.selectedAsset.Name,
    logo: state.AssetReducers.selectedAsset.Logo,

});

const mapDispatchToProps = (dispatch) => ({
    fetchBlock: () => dispatch(fetchBlock())

});

export default connect(mapStateToProps, mapDispatchToProps)(SpaceScreen);

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
    menuButton: {
        // borderColor: "yellow",
        // borderWidth: 3,
        width: 200,
        height: 45,
        margin: 10,
        // resizeMode: "contain",
        borderRadius: 2,
        color: "#f3c736"
        // borderWidth: 2,
        // borderColor: "black"
    },

})