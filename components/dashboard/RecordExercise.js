import React, {useState} from 'react';
import styled from 'styled-components';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'styled-components';
import Button from '../library/Button';
import Text from '../library/Text';
import ExercisePicker from '../library/ExercisePicker';
import Option from '../library/Option';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {addExerciseRecord} from '../../store/reducers/main';
import Close from '../../assets/images/close.svg';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';

const ModalPadding = styled.View`
  padding: 20px;
  width: 100%;
  position: relative;
`;

const CloseWrapper = styled.View`
  background: ${props => props.theme.colors.accent};
  padding: 10px;
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 10px;
`;

const OptionGroup = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const MinutesSlider = styled.View`
  width: 100%;
`;

const Wrapper = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [entry, setEntry] = useState({
    exercise: {
      name: '',
      type: '',
      slug: '',
      isStrengthActivity: false,
      duration: 0,
      id: '',
    },
  });
  const theme = useTheme();
  const {t, i18n} = useTranslation();
  const createRecord = async () => {
    dispatch(addExerciseRecord(entry.exercise));
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <View style={styles.modalView}>
            <CloseWrapper>
              <Close width={30} height={30} />
            </CloseWrapper>
            <ModalPadding>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: theme.colors.accent,
                }}>
                Record new activity
              </Text>
            </ModalPadding>
            <ExercisePicker
              getSelectedExercise={el =>
                setEntry({exercise: {...el, id: uuid.v4()}})
              }
            />
            <MinutesSlider>
              <Picker
                selectedValue={entry.exercise.duration}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setEntry({
                    ...entry,
                    exercise: {...entry.exercise, duration: itemValue},
                  })
                }>
                <Picker.Item label="5 minutes" value={5} />
                <Picker.Item label="10 minutes" value={10} />
                <Picker.Item label="15 minutes" value={15} />
                <Picker.Item label="20 minutes" value={20} />
                <Picker.Item label="25 minutes" value={25} />
                <Picker.Item label="30 minutes" value={30} />
                <Picker.Item label="35 minutes" value={35} />
                <Picker.Item label="40 minutes" value={40} />
                <Picker.Item label="45 minutes" value={45} />
                <Picker.Item label="50 minutes" value={50} />
                <Picker.Item label="55 minutes" value={55} />
                <Picker.Item label="1 hour" value={60} />
              </Picker>
            </MinutesSlider>

            <ModalPadding>
              <Text style={{fontSize: 20, marginBottom: 20}}>Intensity</Text>
              <OptionGroup>
                <Option
                  text="Moderate"
                  selected={entry.exercise.type == 'Moderate'}
                  select={option =>
                    setEntry({
                      ...entry,
                      exercise: {...entry.exercise, type: option},
                    })
                  }
                />
                <Option
                  text="Vigorous"
                  selected={entry.exercise.type == 'Vigorous'}
                  select={option =>
                    setEntry({
                      ...entry,
                      exercise: {...entry.exercise, type: option},
                    })
                  }
                />
              </OptionGroup>
              <Text style={{fontSize: 20, marginBottom: 20}}>
                Was it a strengthening activity?
              </Text>
              <OptionGroup>
                <Option
                  text="Yes"
                  selected={entry.exercise.isStrengthActivity == 'Yes'}
                  select={option =>
                    setEntry({
                      ...entry,
                      exercise: {...entry.exercise, isStrengthActivity: option},
                    })
                  }
                />
                <Option
                  text="No"
                  selected={entry.exercise.isStrengthActivity == 'No'}
                  select={option =>
                    setEntry({
                      ...entry,
                      exercise: {...entry.exercise, isStrengthActivity: option},
                    })
                  }
                />
              </OptionGroup>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                  createRecord();
                }}
                text="Record exercise"
              />
            </ModalPadding>
          </View>
        </ScrollView>
      </Modal>
      <Button
        onPress={() => {
          setModalVisible(true);
        }}
        text={t('app.Home.recordExercise')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Wrapper;
