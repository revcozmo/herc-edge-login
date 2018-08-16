//this will replace the tcomb-form-native/lib/templates/bootstap/textbox.js


var React = require("react");
var { View, Text, TextInput, StyleSheet, Image } = require("react-native");

import userIcon from "./userIcon.png";
import pinDropIcon from "./pinDropIcon.png";
import zipcodeIcon from "./zipcodeIcon.png"

function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxViewStyle = stylesheet.textboxView.notEditable;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  var testLabels = function () {
    if (locals.label == "First name (optional)") {
      return userIcon;
    } else if (locals.label == "Last name (optional)") {
      return userIcon;
    } else if (locals.label == "Address (optional)") {
      return pinDropIcon;
    } else if (locals.label == "Zip code") {
      return zipcodeIcon;
    } else { null; }
  }

  var imageSource = testLabels();

  var insertImage = locals.label ? (<Image style={localStyles.inputIcon} source={imageSource} />) : null;

  // var testLabels = function () {
  //   if (locals.label == "First name (optional)") {
  //     return <Image style={localStyles.inputIcon} source={userIcon} />;
  //   } else if (locals.label == "Last name (optional)") {
  //     return <Image style={localStyles.inputIcon} source={userIcon} />;
  //   } else if (locals.label == "Address (optional)") {
  //     return <Image style={localStyles.inputIcon} source={pinDropIcon} />;
  //   } else if (locals.label == "Zip code") {
  //     return <Image style={localStyles.inputIcon} source={zipcodeIcon} />;
  //   } else { null; }
  // }


  return (
    <View style={formGroupStyle}>
      {label}
      <View style={localStyles.inputContainer}>
        {insertImage}
        <TextInput
          accessibilityLabel={locals.label}
          ref="input"
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          blurOnSubmit={locals.blurOnSubmit}
          editable={locals.editable}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onLayout={locals.onLayout}
          onSelectionChange={locals.onSelectionChange}
          onSubmitEditing={locals.onSubmitEditing}
          onContentSizeChange={locals.onContentSizeChange}
          placeholderTextColor={locals.placeholderTextColor}
          secureTextEntry={locals.secureTextEntry}
          selectTextOnFocus={locals.selectTextOnFocus}
          selectionColor={locals.selectionColor}
          numberOfLines={locals.numberOfLines}
          underlineColorAndroid={locals.underlineColorAndroid}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={value => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          style={localStyles.input}
          value={locals.value}
        />
      </View>
      {help}
      {error}
    </View>
  );
}

module.exports = textbox;


const localStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    // width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 2,
    width: "100%",
    marginLeft: 5,
  },
  inputIcon: {
    height: 22,
    resizeMode: "contain",
    marginLeft: 2,
  },
})
