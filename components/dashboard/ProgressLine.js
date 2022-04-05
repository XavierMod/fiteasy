import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import ExerciseIcon from './ExerciseIcon';

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.progress};
  height: 100%;
  background: ${props => props.theme.colors.accent};
  z-index: 1;
`;

const Lines = styled.View`
  width: 80%;
  position: relative;
  height: 9px;
`;

const BackgroundLine = styled.View`
  width: 100%;
  background: white;
  height: 100%;
`;

const ExercisesIconsWrapper = styled.View`
  position: absolute;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Exercise = styled.View`
  border: 2px solid white;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const ProgressLine = props => {
  const lastWeekFromLoadFile = useSelector(
    state => state.main.loadFile.weeks[props.index],
  );

  const calculatePositions = () => {
    return lastWeekFromLoadFile.exercisesRecorded.map(el => {
      return {
        slug: el.slug,
        type: el.type,
        position: Math.round((el.duration / 155) * 100),
      };
    });
  };
  return (
    <Lines>
      <Wrapper progress={props.progress}>
        <ExercisesIconsWrapper>
          {calculatePositions().map(el => {
            return (
              <Exercise style={{flex: el.position}}>
                <ExerciseIcon type={el.type} slug={el.slug} />
              </Exercise>
            );
          })}
        </ExercisesIconsWrapper>
      </Wrapper>
      <BackgroundLine />
    </Lines>
  );
};

export default ProgressLine;
