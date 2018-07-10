// @flow

import React from 'react'
import {
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

type Props = {
  style: Object,
  src: string,
  content: any,
  enableTouch: boolean,
  callback?: Function | null
}
const BackgroundImage = ({
  // style,
  // src,
  content,
  enableTouch = true,
  callback
}: Props) => {
  const onPress = () => {
    if (callback) {
      return () => {
        // $FlowFixMe
        callback()
        Keyboard.dismiss()
      }
    }
    return Keyboard.dismiss()
  }
  if (enableTouch) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
        {content}
      </View>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <View>
    {content}
  </View>
  )
}

export { BackgroundImage }
