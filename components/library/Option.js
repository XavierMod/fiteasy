import React from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import Text from '../library/Text';
import {useTheme} from 'styled-components';

const Option = styled.View`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  position: relative;
  background: ${props => {
    if (props.selected) {
      return props.theme.colors.primary;
    } else {
      return 'white';
    }
  }};
  border-radius: 5px;
  border: ${props => `2px solid ${props.theme.colors.primary}`};
`;

const Wrapper = props => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => props.select(props.text)} style={{flex: 5}}>
      <Option selected={props.selected}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: props.selected ? 'white' : theme.colors.primary,
          }}>
          {props.text}
        </Text>
      </Option>
    </TouchableOpacity>
  );
};

export default Wrapper;
