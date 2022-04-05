import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './reducers/main'

const store = configureStore({
  reducer: {
      main: mainReducer
  },
})

export default store