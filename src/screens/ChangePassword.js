import React, { Component } from 'react';
import {View, TouchableHighlight, Text, Platform, Image, WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ChangePasswordScreen } from 'herc-edge-login-ui-rn';

class ChangePassword extends Component {

    render() {

        return (
            <ChangePasswordScreen
            // context={this.state.context}
            // onLogin={this.onLogin}
            // accountOptions={{}}
          />
        )

    }
}

export default ChangePassword;