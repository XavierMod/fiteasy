import React from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import Text from '../components/library/Text';
import {useTheme} from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {changeLanguage} from '../store/reducers/main';
import Button from '../components/library/Button';

const Wrapper = styled.View`
  background: ${props => props.theme.colors.primary};
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const LangOption = styled.View`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-top: 70px;
  border-radius: 10px;

  opacity: ${props => {
    if (props.selected) {
      return 1;
    } else {
      return 0.5;
    }
  }};
`;

const Settings = () => {
  const theme = useTheme();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <View style={{flex: 9}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 30}}>
          Settings
        </Text>
        <Text style={{color: 'white', fontSize: 22, marginTop: 15}}>
          Language:
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={{flex: 5}}
            onPress={() => dispatch(changeLanguage('en'))}>
            <LangOption style={{marginRight: 10}}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                English
              </Text>
            </LangOption>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 5}}
            onPress={() => dispatch(changeLanguage('es'))}>
            <LangOption style={{marginRight: 10}}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                Español
              </Text>
            </LangOption>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', fontSize: 22, marginTop: 25}}>
          Export my data:
        </Text>
        <Button style={{marginTop: 20}} text="Download data" />
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontWeight: '700'}}>
          1.0.0 - Production
        </Text>
        <Text style={{color: 'white', marginTop: 10}}>
          2022. Created by @xaviermod
        </Text>
      </View>
    </Wrapper>
  );
};

export default Settings;
