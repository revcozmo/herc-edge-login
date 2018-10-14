import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, ScrollView, YellowBox } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import submit from "./buttons/submit.png";
import { sendTrans } from "../actions/AssetActions";
import fee from "../assets/hercLogoPillar.png";
import newOriginator from "./buttons/originatorButton.png";
import newRecipient from "./buttons/recipientButton.png";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);

//TODO: Fix the image review and create the price reducers with Julie.

class TransRev extends Component {

    constructor(props) {
        super(props);

    }
    componentDidMount = () => {
        // this.getPricesFromApi();
        // TODO: this API needs to be updated

    }
    // async getPricesFromApi() {
    //     try {
    //         let response = await fetch(
    //             'https://jsondata.herc.one/service-1.0-SNAPSHOT/JSON'
    //         );
    //         let responseJson = await response.json();
    //         let fctPrice = responseJson.list["0"].pricePerHercForFCT;
    //         console.log(fctPrice, 'newthing');
    //         this.setState({ fctPrice });

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    _sendTrans(price) {
        const { navigate } = this.props.navigate;
        console.log(this.props, "send trans", price)
        this.props.sendTrans(price);
        this.props.navigate('MenuOptions');

    }
    _getPrices = () => {

        console.log("getPrices")
        let transDat = this.props.transDat;
        let price = 0;
        let imgPrice = 0;
        let docPrice = 0;

        if (transDat.images[0]) {
            imgPrice = ((((transDat.images[0].size / 1024) * (.00000002)) + (.000256)) / (.6));
            console.log(imgPrice, "imgPrice");

        };
        if (transDat.documents[0]) {
            docPrice = .00000000000125;
            console.log(docPrice, "docPRice")
        }
        console.log()


        if ((docPrice + imgPrice) !== 0) {
            price = (docPrice + imgPrice) + (.00000000002);
        }
        console.log(price, "price in getPrice before return")
        return (
            price
        )
    }


    _hasImage = (transDat) => {
        console.log("this is in Image");
        if (transDat.images[0]) {
            let imgPrice = ((((transDat.images[0].size / 1024) * (.00000002)) + (.000256)) / (.6));
            console.log(imgPrice)
            return (
                <View style={localStyles.imgContainer}>
                    <Text style={localStyles.transRevTime}>Images</Text>
                    <Image style={localStyles.thumb} source={{ uri: transDat.images[0].image }} />
                    <Text style={localStyles.revPropVal}>{(transDat.images[0].size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{imgPrice.toFixed(8)}</Text>
                    </View>
                </View>
            );

            console.log(transInfo.price, "transprice plus imageprice", this.state.imgPrice)
        }
        return (<Text style={localStyles.revPropVal}>No Images</Text>)
    }

    _hasDocuments = (transDat) => {
        console.log("this is in Image");
        if (transDat.documents[0]) {
            return (
                <View style={localStyles.docContainer}>
                    <Text style={localStyles.transRevTime}>Documents</Text>
                    <Text style={localStyles.text}>{transDat.documents[0].name}</Text>
                    <Text style={localStyles.text}>{(transDat.documents[0].size / 1024).toFixed(3)} kb</Text>
                    {/* <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{docPrice.toFixed(8)}</Text>
                    </View> */}
                </View>
            );
            console.log(transInfo.price, "transprice plus imageprice", this.state.docPrice)
        }
        return (<Text style={localStyles.revPropVal}>No Documents</Text>)
    }


    _hasList = (transDat) => {
        console.log(this.state, "transdat in haslist");
        if (transDat.properties) {
            list = Object.keys(transDat.properties).map((name, idx) => {
                console.log(name, 'name in for loop in review')
                return (
                    <View key={idx} style={localStyles.revPropField}>
                        <Text style={localStyles.transRevName}>{name}:</Text>
                        <Text style={localStyles.revPropVal}>{transDat.properties[name]}</Text>
                    </View>
                )
            });
            return (
                <View style={localStyles.listContainer}>
                    <Text style={localStyles.transRevTime}>Properties</Text>
                    {list}
                </View>
            )


        }
        return (<Text style={localStyles.revPropVal}>No Properties</Text>)
    }



    render() {
        // let price = this._getPrices();
        // console.log(price, "price")
        let transInfo = this.props.transInfo;
        // let fctPrice = this.state ? this.state.fctPrice : "";
        console.log(this.state, 'price');
        let transDat = this.props.transDat;
        console.log(transInfo, 'transinfo in transreviewrender', transInfo.price, 'transdata')

        let locationImage = this.props.transInfo.tXLocation === 'recipient' ? newRecipient : newOriginator;
        let list, edit;
        let dTime = transDat.dTime;
        let name = this.props.transInfo.name;
        let transPrice = transInfo.price;
        console.log(dTime, 'dtime??');

        if (transDat.hasOwnProperty('ediT')) {
            edit = (
                <View style={localStyles.editField}>
                    <Text style={localStyles.editLabel}>EDI-T-SET:</Text>
                    <Text style={localStyles.text}>{transDat.ediT.name}</Text>
                    <Text style={localStyles.text}>{transDat.ediT.value}</Text>
                </View>)
        }

        // console.log((transDat.hasOwnProperty('properties')));
        console.log("THIS IS LINE 81 IN TRANSACTION REVIEW", this.props.transInfo.name);



        /// I'm using a smaller location image locally. localStyles.assetLocationLabel
        return (

            <View style={localStyles.transactionReviewContainer}>
                <Text style={styles.transReview}>Transaction Review</Text>
                <Text style={{ fontSize: 22, color: "blue", marginTop: 5 }}> {name}  </Text>
                <Image style={localStyles.assetLocationLabel} source={locationImage} />

                <Text style={localStyles.transRevTime}>{dTime}</Text>

                {edit}

                {this._hasImage(transDat)}

                {this._hasDocuments(transDat)}

                {this._hasList(transDat)}



                <TouchableHighlight style={{ margin: 10 }} onPress={() => this._sendTrans(transPrice)}>
                    <Image source={submit} style={localStyles.submitButton} />
                </TouchableHighlight>
                <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{this._getPrices().toFixed(18)}</Text>
                </View>
            </View>

        )
    }
}

const localStyles = StyleSheet.create({
    transactionReviewContainer: {
        // borderColor: "white",
        // borderWidth: 3,
        marginTop: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    submitButton: {
        height: 40,
        width: 175,
        resizeMode: "contain",
        alignSelf: "center",
        // marginTop: 80,
    },
    assetLocationLabel: {
        height: 30,
        width: 150,
        resizeMode: "contain",
        marginTop: 10,
        alignSelf: "center"
        // marginRight: 10
    },
    teePrice: {
        color: "white"
    },
    docContainer: {
        // backgroundColor: "blue",
        width: "100%",
        height: 100,
    },
    imgContainer: {
        // backgroundColor: "yellow",
        width: "100%",
        height: 125,
        justifyContent: "center"
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 2,
        fontFamily: "dinPro"
    },

    thumb: {
        height: 50,
        width: 50,
        resizeMode: "cover",
        alignSelf: "center",
        margin: 4

    },
    editField: {
        height: 75,
        width: "100%",
        // flexDirection: "row",
        justifyContent: "center",
        padding: 3,
        margin: 10,
        // textAlign:'center',
        // textAlignVertical: 'center',
        // backgroundColor: "blue"
    },
    editLabel: {
        fontFamily: "dinPro",
        fontSize: 21,
        color: "yellow",
        margin: 2,
        alignSelf: "center",
        // height: 30
    },
    transRevTime: {
        color: "#f3c736",
        fontFamily: "dinPro",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    transRevName: {
        fontFamily: "dinPro",
        fontSize: 16,
        color: "white",
        margin: 2,
        textAlign: "left"
    },

    revPropField: {
        height: 20,
        width: 225,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        margin: 2,
        // textAlign:'center',
        // textAlignVertical: 'center',
        backgroundColor: "#021227",
        alignSelf: "center"
    },

    revPropVal: {
        fontFamily: "dinPro",
        fontSize: 15,
        color: "white",
        margin: 2,
        textAlign: "center"
    },
    listContainer: {
        margin: 10,
        flex: 1,
        justifyContent: "center"
    },
    feeContainer: {
        height: 20,
        width: 130,
        // resizeMode: 'cover',
        flexDirection: "row",
        // justifyContent: 'space-between',
        // textAlign: "center",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center"
    },
    teePrice: {
        fontSize: 10,
        color: "white",
        backgroundColor: "#091141",
        //   resizeMode: "contain",
        marginRight: 5
    },
    hercPillarIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        borderRadius: 15 / 2
    },

});

const mapStateToProps = (state) => ({
    transInfo: state.AssetReducers.trans.header,
    transDat: state.AssetReducers.trans.data,
    // price: state.dataReducer.prices.list[0].pricePerHercForFCT
})
const mapDispatchToProps = (dispatch) => ({
    sendTrans: (transPrice) => dispatch(sendTrans(transPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransRev);
