import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {View, Text} from 'react-native';
import menu from '../assets/images/menu-icon.png';
import back from '../assets/images/icon-back.png';
import trophy from '../assets/images/icon-trophy.png';
import progress from '../assets/images/icon-progress.png';
import settings from '../assets/images/icon-settings.png';
import {useNavigation} from '@react-navigation/native';

const Wrapper = styled.View`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
`;

const LeftWrapper = styled.View`
  flex: 5;
`;

const RightWrapper = styled.View`
  flex: 5;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

const WithNavbar = props => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('get current route', props.activeRoute);
  }, [props.activeRoute]);

  const renderLeftButton = () => {
    if (props.activeRoute === 'Home') {
      return;
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{width: 40, height: 40}} source={back} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <Wrapper>
      <LeftWrapper>{renderLeftButton()}</LeftWrapper>
      <RightWrapper>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}>
          <Image style={{width: 40, height: 40}} source={progress} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}>
          <Image style={{width: 40, height: 40}} source={trophy} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image style={{width: 40, height: 40}} source={settings} />
        </TouchableOpacity>
      </RightWrapper>
    </Wrapper>
  );
};

export default WithNavbar;
