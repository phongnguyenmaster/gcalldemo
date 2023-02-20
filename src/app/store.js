import { configureStore } from '@reduxjs/toolkit';
import logCallReducer from '../features/logCall/logCallSlice';


export const store = configureStore({
  reducer: {
    logCall: logCallReducer,
  },
});
