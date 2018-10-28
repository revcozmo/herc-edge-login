"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
modalBackground: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '50%',
    width: '90%',
    backgroundColor: '#00000040'

},
activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
},
modalButton: {
    color: 'white',
    fontSize: 40,
    height: 50,
    width: 105,
    margin: 10
}

})