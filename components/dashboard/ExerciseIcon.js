import React from 'react';
import styled from 'styled-components';
import {Image} from 'react-native';
import briskWalking from '../../assets/images/brisk-walking.png';
import dancing from '../../assets/images/dancing.png';

const Wrapper = styled.View`
  background: ${props => {
    if (props.type == 'Moderate') {
      return '#78EA31';
    } else {
        return '#EA72B2'
    }
  }};
  width: 41px;
  height: 41px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
`;

const ExerciseIcon = props => {
  const renderImage = () => {
    if (props.slug == 'brisk-walking') {
      return briskWalking;
    } else if (props.slug == 'dancing') {
      return dancing;
    }
  };

  return (
    <Wrapper type={props.type}>
      <Image
        style={{width: 25, height: 25, resizeMode: 'contain'}}
        source={renderImage()}
      />
    </Wrapper>
  );
};

export default ExerciseIcon;
