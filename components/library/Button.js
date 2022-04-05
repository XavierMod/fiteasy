import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components';

const Button = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.accent};
  border-radius: 10px;
`;

const Transparent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background: transparent
  border-radius: 10px;
`;

const Delete = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background: lightgrey;
  border-radius: 10px;
`;

const Wrapper = props => {
  const theme = useTheme();

  const renderButtons = () => {
    if (props.type === 'transparent') {
      return (
        <Transparent>
          <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>
            {props.text || 'Button'}
          </Text>
        </Transparent>
      );
    }
    if (props.type === 'delete') {
      return (
        <Delete>
          <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>
            {props.text || 'Button'}
          </Text>
        </Delete>
      );
    }
    return (
      <Button>
        <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
          {props.text || 'Button'}
        </Text>
      </Button>
    );
  };

  return (
    <TouchableOpacity
      style={{width: '100%', ...props.style}}
      onPress={props.onPress}>
      {renderButtons()}
    </TouchableOpacity>
  );
};

export default Wrapper;
