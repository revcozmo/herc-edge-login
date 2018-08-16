// import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Button } from 'react-native-elements';
// import { YellowBox } from 'react-native';
// import store from "../store";
// import axios from 'axios';
// import t from 'tcomb-form-native';
// import { _postIdology, _postWebServer } from "./api";
// import {USERNAME, PASSWORD, WEB_SERVER_API_ENDPOINT } from "./settings";
//
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);
// /* Following these guidelines: https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b */
//
// const Form = t.form.Form;
//
// const User = t.struct({
//   edgeAccount:t.maybe(t.String),
//   firstName: t.maybe(t.String),
//   lastName: t.maybe(t.String),
//   address: t.maybe(t.String),
//   zipCode: t.Number,
// });
//
// const options = {
//   // auto: 'placeholders',
//   fields: {
//     edgeAccount: {
//       hidden: true,
//     },
//     firstName: {
//       // label: 'First Name',
//       error: 'This is required.'
//     },
//     lastName: {
//       // label: 'Last Name',
//       error: 'This is required.'
//     },
//     address: {
//       // label: 'Street Address',
//       error: 'This is required.'
//     },
//     zipCode: {
//       // label: 'Zip Code',
//       error: 'This is required.'
//     },
//   },
// };
//
// const formStyles = {
//   ...Form.stylesheet,
//   controlLabel: {
//     normal: {
//       color: 'blue',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     },
//     error: {
//       color: 'red',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     }
//   }
// }
//
// export default class IdologyForm extends Component {
//
//   handleSubmit = () => {
//     const value = this._form.getValue();
//     console.log('****** Idology Form value: ', value);
//     const config = {
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         }
//     }
//
//     let formBody = [];
//     for (let property in value) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(value[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
//     axios.post(WEB_SERVER_API_ENDPOINT, formBody)
//     .then(response => {
//       console.log(response)
//     })
//     .catch(function(error) {
//       console.log(error)
//     });
//
//     // _postWebServer(value)
//     //   .then( response => {
//     //     console.log("*** RESPONSE: ", response)
//     //   })
//     //   .catch(err => {
//     //     console.log("*** ERROR: ", err)
//     //   })
//
//
//     // const { navigate } = this.props.navigation;
//     // navigate('Create');
//   }
//
//   render() {
//     if (!store.getState().AssetReducers.edge_account){
//       edgeAccount = "No Account Captured"
//     } else{
//       edgeAccount = store.getState().AssetReducers.edge_account
//     }
//     var defaultValues = {
//       edgeAccount: edgeAccount,
//     };
//
//     return (
//       <View style={styles.container}>
//         <Form
//           ref={c => this._form = c}
//           type={User}
//           value={defaultValues}
//           options={options}
//         />
//         <Button
//           title="Submit"
//           onPress={this.handleSubmit}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     justifyContent: 'space-evenly',
//     padding: 30,
//     backgroundColor: '#ffffff',
//   },
// });
