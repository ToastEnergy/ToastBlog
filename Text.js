import React from 'react';
import ReactNative from 'react-native';

export default function Text({children, style={}}) {
  return <ReactNative.Text style={[{color: 'white'}, style]}>{children}</ReactNative.Text>;
}
