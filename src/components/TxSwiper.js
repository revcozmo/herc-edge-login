import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { Image, StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import Button from 'react-native-button';
import originator from "./buttons/originatorButton.png";
import recipient from "./buttons/recipientButton.png";
import { WebViewComponent } from "../components/WebViewComponent"
import { StackNavigator } from 'react-navigation';

export default class TxSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.cards,
      hashes: this.props.hashes,
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
  }

  _goToWebView = data => {
    this.props.navigation.navigate("WebViewComponent", {data: data});
  }

  renderCard = card => {
    console.log(card,'chance cards')
    console.log(hashes, 'chance hashes')
    let hashes = this.state.hashes
    let factomChain = hashes.chainId;
    let corePropsHash = hashes.ipfsHash;
    let factomEntry = card.header.factomEntry
    let data = card.data;
    let header = card.header;
    let metricsHash, ediTHash, documentHash, imageHash;

    if(data.hasOwnProperty('ediT')) {
      ediTHash = data.ediT;
    }

    if(data.hasOwnProperty('documents')) {
      documentHash = data.documents;
    }

    if (data.hasOwnProperty('images')) {
      imageHash = data.images;
    }

    if (data.hasOwnProperty('properties')) {
      metricsHash = data.properties;
    }

    return (
      <View key={card.key} style={styles.card}>
        <Text style={styles.revPropVal}>{header.hercId}</Text>
        <Text style={styles.transRevName}>{header.dTime}</Text>
        <Text style={styles.transRevName}>{header.tXLocation}</Text>
        <View style={{margin: 10}}>
          <Text style={styles.text}>Factom Chain:{factomChain}</Text>
          <Text style={styles.text}>Factom Entry:{factomEntry}</Text>

          <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this._goToWebView({factomChain:factomChain, factomEntry:factomEntry}) }>
            <Text style={{fontSize:20, backgroundColor: 'white', textAlign: 'center'}}>View Factom Entry</Text>
          </TouchableHighlight>

          {corePropsHash && <Text style={styles.text}>Core Properties:{corePropsHash}</Text>}
          {imageHash && <Text style={styles.text}>Image StorJ:{imageHash}</Text>}
          {metricsHash && <Text style={styles.text}>Metrics IPFS: {metricsHash}</Text>}
          {documentHash && <Text style={styles.text}>Document IPFS:{documentHash}</Text>}
          {ediTHash && <Text style={styles.text}>EDI-T IPFS:{ediTHash}</Text>}
          <Text style={styles.text}>Price: {header.price}</Text>
        </View>
      </View>
    )
  };

  onSwipedAllCards = () => {
    console.log('Swiped all cards');
    this.setState({
      swipedAllCards: true
    })
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  makeMessage = (cardData) => {
    // console.log(cardData, "data");
    let time = cardData.dTime;
    let location = cardData.tXLocation.toUpperCase() + " ";
    let properties = cardData.properties ? Object.keys(cardData.properties).length + " Properties;\n" : "";
    let images = cardData.images ? cardData.images.length + " Image(s);\n" : "";
    let documents = cardData.documents ? cardData.documents.length + " Document(s);\n" : "";
    let price = "Hercs: " + cardData.price + ";\n";
    let sig = "Sent from TestHerc v.0.2.9"
    let edit = "";
    let password = cardData.password ? cardData.password : "No password";
    if (cardData.ediT) {
      edit = "EDI-T Value: " + cardData.ediT.value;

    }

    let title = this.props.assetName + " " + location + " Transaction @ " + time + ";";
    let message = title + "\n" +
      properties + edit + images + documents + price + password + " " + sig;
    console.log(title, "title", message, "message")
    return [title, message];


  }


  sharing = (data) => {
    console.log("sharing is caring", this.makeMessage(data));
    let shareTitle = this.makeMessage(data);
    console.log(shareTitle[0], "sharetitle", "sharingmessage" + shareTitle[1]);
    Share.share({
      message: shareTitle[1],
      title: shareTitle[0]
    },
      {// Android only:
        dialogTitle: shareTitle[0],
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]


      })
  }

  render() {
    console.log(this.state.cards, 'cards in swiper')
    return (
      <Swiper
        backgroundColor={'#002740'}
        // marginBottom={}
        ref={swiper => {
          this.swiper = swiper
        }}
        onSwiped={this.onSwiped}
        onTapCard={this.swipeLeft}
        cards={this.state.cards}
        cardIndex={this.state.cardIndex}
        cardVerticalMargin={10}
        renderCard={this.renderCard}
        onSwipedAll={this.onSwipedAllCards}
        stackSize={3}
        cardHorizontalMargin={5}
        stackSeparation={15}
        overlayLabels={{
          bottom: {
            title: 'SAVE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          },
          left: {
            title: 'DISCARD',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
              }
            }
          },
          right: {
            title: 'COMPLETE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          },
          top: {
            title: 'TRANSFER',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
      >
        <Button onPress={this.swipeLeft} title='Swipe Left' />
      </Swiper>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,

    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    //  flex: 1,
    height: '80%',
    width: '90%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F3c736',
    justifyContent: "flex-start",
    backgroundColor: '#091141',
    alignSelf: 'center',
    alignContent: "center",
    // left: 0,
    top: -2,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#F3c736',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'transparent',
    height: 17,
    // width: 50
  },
  image: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
    // borderRadius: 50 / 2,
  },
  imgcontainer: {
    flex: 1,
    backgroundColor: "blue",

    justifyContent: "center",
    margin: 5
  },
  assetLocationLabel: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    marginTop: 10,
    alignSelf: "center"
    // marginRight: 10
  },
  done: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
  transReview: {
    color: '#f3c736',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: "200",
    fontFamily: 'dinPro',
  },
  transDocField: {

    height: 45,
    width: '100%',
    // flexDirection: "row",
    justifyContent: "space-around",

    padding: 2,
    margin: 2,
    // textAlign:'center',
    // textAlignVertical: 'center',
    // backgroundColor: '#021227',
    alignSelf: 'center',
    borderColor: '#F3c736',


  },
  transRevName: {
    fontFamily: 'dinPro',
    fontSize: 14,
    color: 'white',
    margin: 2,
    marginBottom: 5,
    textAlign: 'left'

  },
  transRevTime: {
    color: '#f3c736',
    fontSize: 14,
    fontFamily: 'dinPro',
    textAlign: 'center'
  },
  revPropVal: {
    fontFamily: 'dinPro',
    fontSize: 14,
    color: '#f3c736',
    margin: 2,
    // textAlign: 'right'
  },
  transPropField: {
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
  textView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 3,
    borderColor: '#F3c736',
    height: 17,

  }
})
