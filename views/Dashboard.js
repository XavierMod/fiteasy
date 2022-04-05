import React, { useEffect } from 'react';
import {Text, View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-anchor-carousel';
import WeekInfo from '../components/dashboard/WeekInfo';
import {useDispatch, useSelector} from 'react-redux';
import { createNewWeek } from '../store/reducers/main';

const {width: windowWidth} = Dimensions.get('window');

const Wrapper = styled.View`
  background: ${props => props.theme.colors.primary};
  height: 100%;
`;

const Dashboard = () => {
  const carouselRef = React.useRef(null);
  const dispatch = useDispatch();
  const loadFile = useSelector(state => state.main.loadFile);
  const test = useSelector(state => state.main.test);

  useEffect(() => {
    // When loading Week Info, check if a new week needs to be created
    dispatch(createNewWeek());
  }, [])

  return (
    <Wrapper>
      <Carousel
        ref={carouselRef}
        data={loadFile?.weeks}
        renderItem={(item, index) => (
          <WeekInfo
            {...item}
            isCurrentWeek={loadFile?.weeks.length === item.index + 1}
          />
        )}
        itemWidth={windowWidth}
        containerWidth={windowWidth}
        separatorWidth={0}
        initialIndex={loadFile?.weeks.length - 1}
      />
    </Wrapper>
  );
};

export default Dashboard;
