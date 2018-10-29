import React, {Component} from 'react';
import { StyleSheet, Button, Text, TextInput, ActivityIndicator, Modal, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import welcome from "../assets/welcome.png";
// import Button from 'react-native-button';
import modalStyle from "../assets/confModalStyles";

export default class Welcome extends Component {
  static navigationOptions = ({ navigation }) => {
 return{
   header: null
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      pin: ""
    }
  }


  _onPinPress(){
    const { navigate } = this.props.navigation;
     navigate('MenuOptions');
  }
  render(){

    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>

          <View style={styles.menu}>

          <Modal
              transparent={false}
              animationType={'none'}
              visible={true}
              onRequestClose={() => { console.log("modal closed") }}
          >
              <View style={modalStyle.container}>
                  <View style={modalStyle.modalBackground}>
                    <View style={modalStyle.closeButtonContainer}>
                        <TouchableHighlight
                          style={modalStyle.closeButton}
                          onPress={() => this._changeModalVisibility(false)}>
                        <Text style={{ margin: 5, fontSize: 30, color: '#00000070'} }>X</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={modalStyle.wordsText}>Your Transaction Information Is Being Written To The Blockchain</Text>
                      <View style={modalStyle.activityIndicatorWrapper}>
                          <ActivityIndicator
                              animating={true}
                              size="large" color="#091141" />
                      </View>

                      <View>
                          <Text style={modalStyle.wordsText}>Your Transaction Has Completed!</Text>

                            <TouchableHighlight
                              style={modalStyle.modalButton}
                              onPress={() => this._goToMenu()}>
                            <Text style={{ margin: 5} }>Back to Menu</Text>
                            </TouchableHighlight>
                      </View>


                  </View>
              </View>
          </Modal>

            {/* <Button onPress={() => navigate('MenuOptions')} style={{color: 'white', fontSize: 40, height: 50, width: 205, marginTop: 100}}>ENTER</Button> */}
        </View>
      </View>

    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // width: "100%",
    backgroundColor: '#091141',
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  menu: {
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#091141'
    // paddingTop: 50
    // margin: .5,

    },
    button: {
      width: 250,
      height: 50
    },
    input: {
      width: 150,
      height: 40,
      textAlign: "center",
      backgroundColor: "#132c4a",
      // margin: .5,
      fontSize: 20.2,
      fontWeight: "600",
      borderColor: "#142535",
      color: "white",
      borderWidth: 1,
      marginTop: 100
    },
    welcomeBtn: {
    //  marginTop: 10
    }
  });
