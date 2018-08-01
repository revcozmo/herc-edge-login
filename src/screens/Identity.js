import React, {Component} from '../../../../../.cache/typescript/2.9/node_modules/@types/react';
import { LayoutAnimation, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { StackNavigator } from '../../../../../.cache/typescript/2.9/node_modules/@types/react-navigation';
import { Button } from 'react-native-elements';

class Identity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      username: '',
      usernameValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // this.setState({value: event.target.value}, () => {console.log("Value:", this.state.value)} );
    console.log("EVENT: ",event)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // validateUsername() {
  //   const { username } = this.state
  //   const usernameValid = username.length > 0
  //   LayoutAnimation.easeInEaseOut()
  //   this.setState({ usernameValid })
  //   usernameValid || this.usernameInput.shake()
  //   return usernameValid
  // }

  render(){
    return(
      <View style={styles.container}>
         <Text style={styles.welcome}>This is the Identity Form</Text>

         {/* <FormInput
                refInput={input => (this.usernameInput = input)}
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                returnKeyType="next"
                errorMessage={usernameValid ? null : 'Your username can\'t be blank'}
                onSubmitEditing={() => {
                  // this.validateUsername()
                  this.emailInput.focus()
                }}
              /> */}



         <FormLabel>First Name</FormLabel>
         <FormInput
           refInput={input => (this.firstNameInput = input)}
           onChangeText={(value) => this.setState({value})}
           value={this.state.value}
           onBlur={() => console.log(this.state.value)}
           returnKeyType="next"
           onSubmitEditing={() => {
             this.lastNameInput.focus()
           }}
         />
         <FormLabel>Last Name</FormLabel>
         <FormInput
           refInput={input => (this.lastNameInput = input)}
           onChangeText={(lastName) => this.setState({lastName})}
           value={this.state.lastName}
           onBlur={() => console.log(this.state.lastName)}
         />
         <FormLabel>Address</FormLabel>
         <FormLabel>Zip Code</FormLabel>
         <Button onPress={() => this.handleSubmit()} title="Submit"/>
         <FormValidationMessage>Error message</FormValidationMessage>
       </View>
    )
  };
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
});

export default Identity;
