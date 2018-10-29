import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import welcome from "../assets/welcome.png";
import Button from 'react-native-button';
import { connect } from 'react-redux';
// import Loader from '../components/loader';
import styles from '../assets/styles';
import store from '../store';

class ConfirmConf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: true

    }
  }


  _onPress() {
    const { navigate } = this.props.navigation;
    //   console.log(this.state.pin);
    //  if(!this.state.pin === 7362){
    //    Alert.alert("Wrong Pin!");
    //  }
    navigate('MenuOptions');

  }

  componentDidMount() {
    if (this.props.dataFlags) {
      this.setState({
        dataFlags: store.getState().AssetReducers.dataFlags,
        transDataFlags: store.getState().AssetReducers.transDataFlags
      })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = navigate.state;

    let transType = params.transType === 'transaction' ? this.state.transDataFlags : this.state.dataFlags
    // Alert.alert('Welcome to the HERC Demo!');
    console.log(this.state.dataFlags)

    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        {/* <View style={modalStyle.container}> */}
        <View style={modalStyle.modalBackground}>
          {!transType.confTransComplete &&

            <Text style={modalStyle.wordsText}>Your Transaction Information Is Being Written To The Blockchain</Text>
          }
          <View style={modalStyle.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={!transType.confTransComplete} size="large" color="#091141" />
          </View>

          {transType.confTransComplete &&
            <View>
              <Text style={modalStyle.wordsText}>Your Transaction Has Completed!</Text>
              <Button
                title={'BackToMenu'}
                onPress={() => this._goToMenu()}
                style={modalStyle.modalButton}>Menu</Button>
            </View>
          }
          <Button
            title={'Close Modal'}
            onPress={() => this._changeModalVisibility(false)}
            style={modalStyle.modalButton}>Menu</Button>

          <Button onPress={() => navigate('MenuOptions')} style={{ color: 'white', fontSize: 40, height: 50, width: 205, marginTop: 100 }}>ENTER</Button>
        </View>
      </View>


    )
  };
}

mapStateToProps = (state) => ({

  // newAsset: state.AssetReducers.newAsset,
  dataFlags: state.AssetReducers.dataFlags

})

export default connect(mapStateToProps)(ConfirmConf)

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
