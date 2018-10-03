import React, { Component } from 'react';
import { View, StyleSheet, Text, YellowBox, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import config from "../constants/authtoken";
import CustomMultiPicker from 'react-native-multiple-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WEB_SERVER_API_SUBMIT_RESPONSES } from "../components/settings";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);

export default class IdologyQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      questions: null,
      response: [],
      tempResponse: null,
    }
  }


  componentWillMount(){
    var questions = this.props.navigation.getParam('questions', 'No-Questions-Received')
    this.setState({questions: questions})
  }
/*TODO: with redux gets callback out. Steve wants to put everything in redux.*/


  submitResponses() {
    if (this.state.index < 2 ){
      this.setState({index: this.state.index + 1}, () => {console.log(this.state)})
    } else {
      setTimeout(() => {
        axios.post(WEB_SERVER_API_SUBMIT_RESPONSES, this.state.response, config)
          .then(response => {
            console.log("===DEFCON====",response)
          })
          .catch( error => {
            console.log(error)
          });

        const { navigate } = this.props.navigation;
        navigate('MenuOptions');
      },
          2000
      )
    }
  }


  handlePress = () => {
    var temp = this.state.tempResponse
    this.setState({response: this.state.response.concat(temp)}, this.submitResponses())
  }


  render() {

    var questions = this.state.questions
    var index = this.state.index

    var questionType = questions.questions[index].type
    var question = questions.questions[index].prompt
    var answersList = questions.questions[index].answer

      return(

        <View>
        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>{question}</Text>

        <CustomMultiPicker
          options={answersList}
          search={false}
          multiple={false} //
          placeholder={"Search"}
          placeholderTextColor={'#757575'}
          returnValue={"value"} // label or value
          callback={(res)=>{
            console.log(res)
            this.setState({tempResponse: res})
          }}
          rowBackgroundColor={"#eee"}
          rowHeight={40}
          rowRadius={5}
          iconColor={"#00a2dd"}
          iconSize={30}
          selectedIconName={"ios-checkmark-circle-outline"}
          unselectedIconName={"ios-radio-button-off-outline"}
          scrollViewHeight={300}
        />

      <Button
        title="Next Question"
        icon={{ name: 'filter-list', style: { marginLeft: 0 , fontSize: 25} }}
        // loading
        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#00a2dd",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
        }}
        containerStyle={{ marginTop: 20 }}
        onPress={this.handlePress}
      />

    </View>
    )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
