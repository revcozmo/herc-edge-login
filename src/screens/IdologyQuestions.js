import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import welcome from "../assets/welcome.png";
import Button from 'react-native-button';

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
  //   console.log(this.state.pin);
  //  if(!this.state.pin === 7362){
  //    Alert.alert("Wrong Pin!");
  //  }
     navigate('MenuOptions');

  }
  render(){
    // Alert.alert('Welcome to the HERC Demo!');


    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>

          <View style={styles.menu}>

            {/* <TextInput onChangeText={(pin) => this.setState({pin})} placeholder="PIN" underlineColorAndroid='transparent' style={styles.input}/>
         */}
            {/* <TouchableHighlight style={styles.welcomeBtn} onPress={() => this._onPinPress()}>
              <Image
                  style={styles.button}
                  source={welcome}
                />
            </TouchableHighlight>
          </View> */}

            <Button onPress={() => navigate('MenuOptions')} style={{color: 'white', fontSize: 40, height: 50, width: 205, marginTop: 100}}>ENTER</Button>
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




// import React, { Component } from 'react';
// import { View, StyleSheet, Text, YellowBox, TouchableHighlight } from 'react-native';
// import { Button } from 'react-native-elements';
// import axios from 'axios';
// import config from "../constants/authtoken";
// import CustomMultiPicker from 'react-native-multiple-select-list';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { WEB_SERVER_API_SUBMIT_RESPONSES } from "../components/settings";
//
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);
//
// export default class IdologyQuestions extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: 0,
//       questions: null,
//       response: [],
//       tempResponse: null,
//     }
//   }
//
//
//   componentWillMount(){
//     var questions = this.props.navigation.getParam('questions', 'No-Questions-Received')
//     this.setState({questions: questions})
//   }
// /*TODO: with redux gets callback out. Steve wants to put everything in redux.*/
//
//
//   submitResponses() {
//     if (this.state.index < 2 ){
//       this.setState({index: this.state.index + 1}, () => {console.log(this.state)})
//     } else {
//       setTimeout(() => {
//         axios.post(WEB_SERVER_API_SUBMIT_RESPONSES, this.state.response, config)
//           .then(response => {
//             console.log("===DEFCON====",response)
//           })
//           .catch( error => {
//             console.log(error)
//           });
//
//         const { navigate } = this.props.navigation;
//         navigate('MenuOptions');
//       },
//           2000
//       )
//     }
//   }
//
//
//   handlePress = () => {
//     var temp = this.state.tempResponse
//     this.setState({response: this.state.response.concat(temp)}, this.submitResponses())
//   }
//
//
//   render() {
//
//     var questions = this.state.questions
//     var index = this.state.index
//
//     var questionType = questions.questions[index].type
//     var question = questions.questions[index].prompt
//     var answersList = questions.questions[index].answer
//
//       return(
//
//         <View>
//         <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>{question}</Text>
//
//         <CustomMultiPicker
//           options={answersList}
//           search={false}
//           multiple={false} //
//           placeholder={"Search"}
//           placeholderTextColor={'#757575'}
//           returnValue={"value"} // label or value
//           callback={(res)=>{
//             console.log(res)
//             this.setState({tempResponse: res})
//           }}
//           rowBackgroundColor={"#eee"}
//           rowHeight={40}
//           rowRadius={5}
//           iconColor={"#00a2dd"}
//           iconSize={30}
//           selectedIconName={"ios-checkmark-circle-outline"}
//           unselectedIconName={"ios-radio-button-off-outline"}
//           scrollViewHeight={300}
//         />
//
//       <Button
//         title="Next Question"
//         icon={{ name: 'filter-list', style: { marginLeft: 0 , fontSize: 25} }}
//         // loading
//         loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
//         titleStyle={{ fontWeight: "700" }}
//         buttonStyle={{
//           backgroundColor: "#00a2dd",
//           width: 300,
//           height: 45,
//           borderColor: "transparent",
//           borderWidth: 0,
//           borderRadius: 5,
//         }}
//         containerStyle={{ marginTop: 20 }}
//         onPress={this.handlePress}
//       />
//
//     </View>
//     )};
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   }
// });
