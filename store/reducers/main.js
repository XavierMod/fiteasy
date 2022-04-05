import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RNFS from 'react-native-fs';
import i18n from '../../config/i18n';
import {getMainPath} from '../../services/getPath';
import saveLoadFileToDevice from '../../services/saveLoadFileToDevice';
import shouldCreateANewWeek from '../../services/shouldCreateANewWeek';
import todaysDate from '../../services/todaysDate';

const initialState = {
  isFirstRun: true,
  loadFile: null,
  loadFileLoaded: false,
  test: 'this is a test',
};

export const loadFile = createAsyncThunk('loadFile', async () => {
  const json = await RNFS.readFile(`${getMainPath()}/load/fiteasy-load.json`);

  // * Loading language from save file
  i18n.changeLanguage(JSON.parse(json).language);

  return json;
});

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    createNewWeek(state) {
      if (
        shouldCreateANewWeek(
          state.loadFile.weeks[state.loadFile.weeks.length - 1]?.timestamp,
        )
      ) {
        const getToday = todaysDate();

        state.loadFile.weeks.push({
          strengthActivitiesLeft: 2,
          timestamp: getToday,
          trophiesEarned: 0,
          exercisesRecorded: [],
        });
      }
    },
    addExerciseRecord(state, {payload}) {
      mainSlice.caseReducers.createNewWeek(state);

      state.loadFile.weeks[
        state.loadFile.weeks.length - 1
      ].exercisesRecorded.push(payload);
      saveLoadFileToDevice(state.loadFile);
    },
    deleteExerciseRecord(state, {payload}) {
      const getLastWeek = state.loadFile.weeks[state.loadFile.weeks.length - 1];
      const findMatchIndex = getLastWeek.exercisesRecorded.findIndex(
        el => el.id === payload,
      );
      getLastWeek.exercisesRecorded.splice(findMatchIndex, 1);
      saveLoadFileToDevice(state.loadFile);
    },
    changeLanguage(state, {payload}) {
      i18n.changeLanguage(payload);
      state.loadFile.language = payload;
      saveLoadFileToDevice(state.loadFile);
      console.log(payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadFile.fulfilled, (state, {payload}) => {
      state.loadFile = JSON.parse(payload);
      state.loadFileLoaded = true;
      console.log(`[Main.js -> loadFile] SUCCESS`, state.loadFile);
    });
  },
});

export const {
  deleteExerciseRecord,
  addExerciseRecord,
  changeLanguage,
  calculateWeek,
  createNewWeek
} = mainSlice.actions;
export default mainSlice.reducer;
