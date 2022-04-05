import Autocomplete from 'react-native-autocomplete-input';
import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import exercises from '../../data/exercises.json';

const Container = styled.View`
  position: relative;
  width: 100%;
  padding-top: 70px;
  z-index: 100;
`;

const AutocompleteContainer = styled.View`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: #14bdd3;
  transform: scale(1.05);
  border-radius: 10px;
`;

const ExercisePicker = props => {
  const [allResults, setAllResults] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hideResults, setHideResults] = useState(false);

  const updateResults = el => {
    if (el === '') {
      return [];
    }
    setResults(allResults.filter(movie => movie.name.includes(el)));
    setHideResults(false);
  };

  const selectItem = item => {
    setQuery(item.name);
    setHideResults(true);
    props.getSelectedExercise(item);
  };

  useEffect(() => {
    setAllResults(exercises.exercises);
  }, []);

  return (
    <Container>
      <AutocompleteContainer>
        <Autocomplete
          inputContainerStyle={{padding: 0}}
          autoCorrect={false}
          data={results}
          value={query}
          hideResults={hideResults}
          onChangeText={el => {
            updateResults(el);
            setQuery(el);
          }}
          renderTextInput={el => <TextInput {...el} style={styles.input} />}
          placeholder={'Exercise'}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            keyExtractor: movie => movie.id,
            renderItem: ({item}) => (
              <TouchableOpacity onPress={() => selectItem(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </AutocompleteContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 20,
    margin: 2,
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    borderWidth: 0,
    margin: 0,
    padding: 15,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    fontWeight: '600'
  },
});

export default ExercisePicker;
