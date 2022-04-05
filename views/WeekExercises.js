import React, {useEffect} from 'react';
import styled from 'styled-components';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../components/library/Text';
import Button from '../components/library/Button';
import {deleteExerciseRecord} from '../store/reducers/main';

const Wrapper = styled.View`
  background: ${props => props.theme.colors.primary};
  height: 100%;
  padding: 20px;
`;

const Stats = styled.View`
  display: flex;
  flex-direction: row;
`;

const Stat = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Exercises = styled.View`
  margin-top: 30px;
`;

const Exercise = styled.View`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ExerciseTitle = styled.View`
  background: ${props => props.theme.colors.accent};
  padding: 15px;
  border-radius: 5px;
`;

const WeekExercises = () => {
  const loadFile = useSelector(state => state.main.loadFile);
  const lastWeekFromLoadFile = useSelector(
    state => state.main.loadFile.weeks[state.main.loadFile.weeks.length - 1],
  );
  const dispatch = useDispatch();

  const countTypeOfExercises = type => {
    return lastWeekFromLoadFile.exercisesRecorded.filter(el => el.type === type)
      .length;
  };

  return (
    <ScrollView>
      <Wrapper>
        <Stats>
          <Stat>
            <Text style={{color: 'white', fontSize: 45, fontWeight: '600'}}>
              {countTypeOfExercises('Moderate')}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                maxWidth: 100,
                marginLeft: 15,
              }}>
              Moderate exercises
            </Text>
          </Stat>
          <Stat style={{marginLeft: 20}}>
            <Text style={{color: 'white', fontSize: 45, fontWeight: '600'}}>
              {countTypeOfExercises('Vigorous')}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                maxWidth: 100,
                marginLeft: 15,
              }}>
              Vigorous exercises
            </Text>
          </Stat>
        </Stats>

        <Exercises>
          {lastWeekFromLoadFile.exercisesRecorded.map(el => {
            return (
              <Exercise key={el.id}>
                <ExerciseTitle>
                  <Text
                    style={{color: 'white', fontWeight: '600', fontSize: 22}}>
                    {el.name} ({el.duration} mins)
                  </Text>
                </ExerciseTitle>
                <Text style={{fontSize: 20, marginTop: 20, marginBottom: 20}}>
                  {el.type} exercise
                </Text>
                <Button
                  type="delete"
                  onPress={() => {
                    dispatch(deleteExerciseRecord(el.id));
                  }}
                  text="Delete"
                />
              </Exercise>
            );
          })}
        </Exercises>
      </Wrapper>
    </ScrollView>
  );
};

export default WeekExercises;
