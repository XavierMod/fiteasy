import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components';
import calculateExercise, {
  calculateExtra,
  calculateTotalActivity,
  calculateTotalPercentage,
} from '../../services/calculateExercise';
import Text from '../library/Text';
import Button from '../library/Button';
import heartImage from '../../assets/images/heart-week.png';
import {useDispatch, useSelector} from 'react-redux';
import RecordExercise from './RecordExercise';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ProgressLine from './ProgressLine';
import { createNewWeek } from '../../store/reducers/main';

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 25px;
`;

const WeekTitle = styled.View`
  width: 100%;
  flex: 5%;
`;

const MinutesLeft = styled.View`
  width: 100%;
  flex: 55%;
`;

const ImageWrapper = styled.View`
  height: 75px;
  width: 75px;
  position: absolute;
  right: 0px;
`;

const LinePath = styled.View`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 100px 0;
`;

const MoreInformation = styled.View`
  display: flex;
  flex-direction: row;
  flex: 20%;
`;

const Block = styled.View`
  display: flex;
  flex: 5;
`;

const Buttons = styled.View`
  flex: 20%;
  width: 100%;
`;

const WeekInfo = ({item, index, isCurrentWeek}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [remainingActivity, setRemainingActivity] = useState(0);
  const [totalActivity, setTotalActivity] = useState(0);
  const [extraActivity, setExtraActivity] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState('0%');
  const loadFile = useSelector(state => state.main.loadFile);

  const calculateMinutesFromExercise = type => {
    return item.exercisesRecorded
      .filter(el => {
        if (el.type === type) {
          console.log(el.type, type);
          return el;
        }
      })
      .map(el => {
        console.log(el.duration);
        return el.duration;
      })
      .reduce((partialSum, a) => partialSum + a, 0);
  };

  useEffect(() => {
    setRemainingActivity(
      calculateExercise({
        moderate: calculateMinutesFromExercise('Moderate'),
        vigorous: calculateMinutesFromExercise('Vigorous'),
      }),
    );

    setTotalActivity(
      calculateTotalActivity({
        moderate: calculateMinutesFromExercise('Moderate'),
        vigorous: calculateMinutesFromExercise('Vigorous'),
      }),
    );

    setExtraActivity(
      calculateExtra({
        moderate: calculateMinutesFromExercise('Moderate'),
        vigorous: calculateMinutesFromExercise('Vigorous'),
      }),
    );

    setTotalPercentage(
      calculateTotalPercentage({
        moderate: calculateMinutesFromExercise('Moderate'),
        vigorous: calculateMinutesFromExercise('Vigorous'),
      }),
    );
  }, [loadFile]);

  return (
    <Wrapper>
      <WeekTitle>
        <Text style={{color: 'white', fontSize: 25}}>
          {t('app.Home.week')} {index + 1}
        </Text>
      </WeekTitle>
      <MinutesLeft>
        <Text style={{color: 'white', fontSize: 75, fontWeight: '700'}}>
          {remainingActivity < 0 ? totalActivity : remainingActivity}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontFamily: 'Montserrat-Regular',
          }}>
          {remainingActivity < 0 ? 'Total minutes' : t('app.Home.minutesLeft')}
        </Text>
        <Text style={{color: 'white', fontSize: 18}}>
          {t('app.General.moderateActivity')}
        </Text>
        {remainingActivity < 0 ? (
          <Text>{extraActivity}</Text>
        ) : (
          <LinePath>
            <ProgressLine index={index} progress={totalPercentage} />
            <ImageWrapper>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                source={heartImage}
              />
            </ImageWrapper>
          </LinePath>
        )}
      </MinutesLeft>
      <MoreInformation>
        <Block>
          <Text style={{color: 'white', fontSize: 40}}>
            {item.strengthActivitiesLeft}
          </Text>
          <Text style={{color: 'white', fontSize: 20}}>
            {t('app.Home.strengthActivitiesLeft')}
          </Text>
        </Block>
        <Block>
          <Text style={{color: 'white', fontSize: 40}}>
            {item.trophiesEarned}
          </Text>
          <Text style={{color: 'white', fontSize: 20}}>{t('app.Home.myTrophiesEarned')}</Text>
        </Block>
      </MoreInformation>
      {isCurrentWeek ? (
        <Buttons>
          <RecordExercise />
          <Button
            onPress={() => navigation.navigate('WeekExercises')}
            type="transparent"
            text={t('app.Home.editWeekExercise')}
          />
        </Buttons>
      ) : null}
    </Wrapper>
  );
};

export default WeekInfo;
