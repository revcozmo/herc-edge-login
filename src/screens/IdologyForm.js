import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { YellowBox } from 'react-native';
import store from "../store";
import axios from 'axios';
import t from 'tcomb-form-native';
import {USERNAME, PASSWORD, WEB_SERVER_API_TOKEN, WEB_SERVER_API_IDENTITIES } from "../components/settings";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);
/* Following these guidelines: https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b */

const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.color = 'black';
// overriding the text box background color
stylesheet.textbox.normal.backgroundColor = 'white';
// overriding the text box label color
stylesheet.controlLabel.normal.color = 'silver';

const Form = t.form.Form;

const User = t.struct({
  /* TODO: remove all t.maybe */
  edgeAccount:t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  address: t.maybe(t.String),
  zipCode: t.Number,
});

const options = {
  // auto: 'placeholders',
  label:<Text style={{fontSize: 30, color: 'white'}}>KYC/AML</Text>,
  fields: {
    edgeAccount: {
      hidden: true,
    },
    firstName: {
      label: 'First Name',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    lastName: {
      label: 'Last Name',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    address: {
      label: 'Address',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    zipCode: {
      label: 'Zip Code',
      error: 'This is required.',
      stylesheet: stylesheet
    },
  },
};

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

export default class IdologyForm extends Component {

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('****** Idology Form value: ', value);
    var AUTH_TOKEN = store.getState().AssetReducers.auth_token
    const config = {
     headers: {
         'Authorization': AUTH_TOKEN,
         'Access-Control-Allow-Headers': 'x-access-token',
         'x-access-token': AUTH_TOKEN,
         'Content-Type': 'application/x-www-form-urlencoded'
     }
   }

    let formBody = [];
    for (let property in value) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(value[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("Config: ", config.headers)
    console.log("formBody: ", formBody)

    axios.post(WEB_SERVER_API_IDENTITIES, formBody, {headers: config.headers})
    .then(response => {
       const { navigate } = this.props.navigation;
        navigate('IdologyQuestions', {questions: response.data});
     })

    .catch(function(error) {
      console.log(error)
    });

    // const { navigate } = this.props.navigation;
    // navigate('Create');
  }

  render() {
    if (!store.getState().AssetReducers.edge_account){
      edgeAccount = "No Account Captured"
    } else{
      edgeAccount = store.getState().AssetReducers.edge_account
    }
    var defaultValues = {
      edgeAccount: edgeAccount,
    };

    return (
      <View style={localStyles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
          value={defaultValues}
          options={options}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={localStyles.buttonContainer}>
          <Text style={localStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091141",
    padding: 40,
  },
  hercLogo: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
    marginBottom: "10%",
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingVertical: 5,
    marginTop: 60,
    borderRadius: 2,
    borderColor: "gold",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }
});
