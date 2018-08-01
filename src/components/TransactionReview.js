import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
// import originator from "../assets/origin.png";
// import recipient from "../assets/recipient.png";
import submit from "./buttons/submit.png";
import { sendTrans } from "../actions/AssetActions";
import fee from "../assets/hercLogoPillar.png";
import newOriginator from "./buttons/originatorButton.png";
import newRecipient from "./buttons/recipientButton.png";
//TODO: Fix the image review and create the price reducers with Julie.

class TransRev extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgPrice: 5,
            docPrice: 0,
        };
    }
    componentDidMount = () => {
        this.getPricesFromApi();
        // this.setState({image: this._hasImage(this.props.transDat)});
        // let doc = this._hasDocuments(this.props.transDat);
        // this.setState({
        //     ...this.state,
        //     image,
        //     doc
        // })
        console.log(this.state, "this state")
    }
    // TODO: this API needs to be updated
    async getPricesFromApi() {
        try {
            let response = await fetch(
                'https://jsondata.herc.one/service-1.0-SNAPSHOT/JSON'
            );
            let responseJson = await response.json();
            let fctPrice = responseJson.list["0"].pricePerHercForFCT;
            console.log(fctPrice, 'newthing');
            this.setState({ fctPrice });

        } catch (error) {
            console.error(error);
        }
    }

    _sendTrans(price) {
        const { navigate } = this.props.navigate;
        console.log(this.props, "send trans", price)
        this.props.sendTrans(price);
        this.props.navigate('MenuOptions');

    }
    _getPrices = () => { }


    _hasImage = (transDat) => {
        console.log("this is in Image");
        if (transDat.images[0]) {
            let imgPrice = ((transDat.images[0].size / 1024) * (this.state.fctPrice));
            console.log()
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

            // transPrice = (transPrice + imgPrice);
            console.log(transDat.price, "transprice plus imageprice", this.state.imgPrice)
        }
        return (<Text style={localStyles.revPropVal}>No Images</Text>)
    }

    _hasDocuments = (transDat) => {
        console.log("this is in Image");
        if (transDat.documents[0]) {
            let docPrice = ((transDat.documents[0].size / 1024) * (.001));
            // this.setState(docPrice);
            return (
                <View style={localStyles.docContainer}>
                    <Text style={localStyles.transRevTime}>Documents</Text>
                    <Text style={localStyles.text}>{transDat.documents[0].name}</Text>
                    <Text style={localStyles.text}>{(transDat.documents[0].size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{docPrice.toFixed(8)}</Text>
                    </View>
                </View>
            );

            // transPrice = (transPrice + imgPrice);
            console.log(transDat.price, "transprice plus imageprice", this.state.docPrice)
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
        // this.getPricesFromApi();
        let transInfo = this.props.transInfo;
        let fctPrice = this.state ? this.state.fctPrice : "";
        console.log(this.state, 'price');
        let transDat = this.props.transDat;
        let price = transDat.price;
        console.log(transInfo, 'transinfo in transreviewrender', transDat.price, 'transdata')

        let locationImage = this.props.transDat.tXLocation === 'recipient' ? newRecipient : newOriginator;
        let list, edit;
        // let ediTName, ediTNum, hasDoc, hasImage, docSize, image, imageSize = null;
        let dTime = transDat.dTime;
        let name = this.props.transInfo.name;
        // let imgPrice = 0;
        // let docPrice = 0;
        let transPrice = transDat.price;
        console.log(dTime, 'dtime??');


        // if (transDat.documents[0]) {
        //     console.log("have a document")

        //     docPrice = ((transDat.documents[0].size / 1024) * (0.001));

        //     hasDoc = (
        // <View style={localStyles.docContainer}>
        //     <Text style={localStyles.text}>Documents</Text>
        //     <Text style={localStyles.transRevTime}>{transDat.documents[0].name}</Text>
        //     <Text style={styles.transRevTime}>{(transDat.documents[0].size / 1024).toFixed(3)} kb</Text>
        //     <Text style={styles.transRevTime}>Price: {docPrice}</Text>
        // </View>

        //     );
        //     transPrice = (transPrice + docPrice);
        //     console.log(transPrice, "transprice plus docPrice", docPrice)
        // }

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
                {/* {/* <Text style={styles.transRevName}>{transInfo.name}</Text> */}
                {/* <Text style={styles.transRevName}>HercID: {transInfo.hercId}</Text> */}
                <Text style={localStyles.transRevTime}>{dTime}</Text>
                {/* <Text style={styles.editLabel}>EDI-T-SET:</Text> */}
                {/* <Text style={styles.transRevTime}>{ediTName}</Text>
                <Text style={styles.transRevTime}>{ediTNum}</Text> */}
                {/* <Text style={styles.editLabel}>Images and Size</Text> */}
                {edit}
                {/* {image}
                {imageSize} */}
                {/* <Text style={styles.revPropVal}>{imgPrice.toFixed(8)}</Text> */}
                {/* <Text style={styles.editLabel}>Document Name and Size</Text> */}
                {this._hasImage(transDat)}
                {/* {this.state.imgPrice} */}
                {this._hasDocuments(transDat)}
                {/* {docSize} */}
                {/* <Text style={styles.revPropVal}>{docPrice.toFixed(8)}</Text> */}
                {this._hasList(transDat)}



                {/* <Text style={localStyles.teePrice}>Price: {(transPrice.toFixed(8))}</Text> */}
                <TouchableHighlight style={{ margin: 10 }} onPress={() => this._sendTrans(transPrice)}>
                    <Image source={submit} style={localStyles.submitButton} />
                </TouchableHighlight>
                <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{price.toFixed(8)}</Text>
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
    input: {
        // width: "53%",
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
    transRevTime: {
        color: "#f3c736",
        fontFamily: "dinPro",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
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
          width: 75,
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
          backgroundColor: "#021227",
        //   resizeMode: "contain",
          marginRight: 5
        },
        hercPillarIcon: {
            height: 15,
            width: 15,
            resizeMode: "contain",
            borderRadius: 15/2
          },
      
});

const mapStateToProps = (state) => ({
    transInfo: state.AssetReducers.trans.header,
    transDat: state.AssetReducers.trans.data
})
const mapDispatchToProps = (dispatch) => ({
    sendTrans: (transPrice) => dispatch(sendTrans(transPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransRev);