import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { Image, StyleSheet, Text, View, Share } from 'react-native';
import Button from 'react-native-button';
import originator from "./buttons/originatorButton.png";
import recipient from "./buttons/recipientButton.png";
import fee from "../assets/hercLogoPillar.png";
import { createStackNavigator } from "react-navigation";

var currentCard = 0;
// import styles from '../assets/styles';
export default class TxSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.cards,
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
  }

  renderCard = (card) => {
    let data = card.transData;
    // if(card.data) data = card.data;
    // if(card.transData) data = card.transdata;
    let locationImage,
      dTime,
      price,
      ediT,
      docName,
      docs,
      imgNum,
      imgName,
      images,
      list;


    data.hasOwnProperty('tXLocation') ?
      locationImage = data.tXLocation === 'Recipient' ? recipient : originator : "";

    dTime = data.hasOwnProperty('dTime') ? <Text style={styles.transRevTime}>{data.dTime}</Text> : null;

    if (data.hasOwnProperty('ediT')) {
      ediT = (
        <View style={{ height: 30, width: '70%' }}>
          <Text style={styles.text}>{data.ediT.name}:</Text>
          <Text style={styles.text}>{data.ediT.value}</Text>
        </View>
      )
    }


    if (data.hasOwnProperty('documents')) {
      docNum = data.documents.length
      docs = data.documents.map((x, i) => {
        return (
          <View key={i} style={styles.transDocField}>
            <Text style={styles.text}>{x.name}</Text>
            <Text style={styles.text}>{(x.size / 1024).toFixed(4)} kb</Text>

          </View>
        )
      })
    }

    if (data.hasOwnProperty('images')) {
      imgNum = data.images.length
      images = data.images.map((x, i) => {
        return (
          <View key={i} style={styles.imgContainer}>
            <Image style={styles.image} source={{ uri: x.image }} />
            <Text style={styles.text}>{(x.size / 1024).toFixed(4)} kb</Text>
          </View>
        )
      })
    }

    if (data.hasOwnProperty('properties')) {
      list = Object.keys(data.properties).map((name, idx) => {
        return (
          <View key={idx} style={styles.transPropField}>
            <Text style={styles.transRevName}>{name}:</Text>
            <Text style={styles.revPropVal}>{data.properties[name]}</Text>
          </View>
        )
      })
    }

    if (data.hasOwnProperty('price')) {
      price = <View style={[styles.transPropField, {marginTop: 10}]}>
        <Image style={styles.hercPillarIcon} source={fee} />
        <Text style={styles.revPropVal}>{data.price}</Text>
      </View>

    }


    return (
      <View key={card.key} style={styles.card}>
        <Image style={styles.assetLocationLabel} source={locationImage} />
        {dTime}
        <View style={styles.transPropField}>
          <Text style={styles.transRevName}>Herc ID:</Text>
          <Text style={styles.revPropVal}>{this.props.hercId}</Text>
        </View>
        {ediT}
        {docs}
        {images}
        {list}
        {price}
      </View>
    )
  };

  onSwipedAllCards = () => {
    console.log('Swiped all cards');
    this.setState({
      swipedAllCards: true,
      cardIndex: 0
    })
  };

  onSwiped = (index) => {
    currentCard = index;
    console.log("index", index, "and currentCard", currentCard)
    console.log(this.state.cards[index])

  }
  swipeBack = () => {
    console.log("swiping back");
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    // let cb = "what the hell is this";
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };

  swipeLeft = () => {
    // console.log(this.state.cards.data, "card data right card?")
    console.log("swiping left");

  };

  swipeTop = () => {
    this.sharing(this.state.cards[currentCard].transData);
    // this.makeMessage(this.state.cards[currentCard].data);
  }

  swipeBottom = () => {
    const {navigate} = this.props.navigate
    console.log('Swiping Down/Bottom');
    navigate('PreHipr');


  }

  makeMessage = (cardData) => {
    // console.log(cardData, "data");
    let time = cardData.dTime;
    let location = cardData.tXLocation.toUpperCase() + " ";
    let properties = cardData.properties ? Object.keys(cardData.properties).length + " Properties;\n" : "";
    let images = cardData.images ? cardData.images.length + " Image(s);\n" : "";
    let documents = cardData.documents ? cardData.documents.length + " Document(s);\n" : "";
    let price = "Hercs: " + cardData.price +";\n";
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
    console.log(this.swiper, "swiper")
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
        onSwipedTop={this.swipeTop}
        onSwipedLeft={this.swipeLeft}
        onSwipedBottom={this.swipeBottom}
        // onSwipedRight={this.swipeTop}
        stackSize={3}
        cardHorizontalMargin={5}
        stackSeparation={15}
        overlayLabels={{
          bottom: {
            title: 'VALIDATE',
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
            title: 'NEXT',
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
            title: 'NEXT',
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
            title: 'SHARE',
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
// const mapStateToProps = (state) => {
//   assetName: state.AssetReducers.selectedAsset.name
// }


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

  },
  hercPillarIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    borderRadius: 15 / 2
},
})
