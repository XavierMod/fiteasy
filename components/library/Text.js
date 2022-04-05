import React from 'react'
import {View, Text} from 'react-native';

const Wrapper = (props) => {
  return (
    <Text style={{fontFamily: 'Montserrat-Regular', ...props.style}}>{props.children}</Text>
  )
}

export default Wrapper