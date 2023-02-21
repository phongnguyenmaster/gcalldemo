import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
};

export const logCallSlice = createSlice({
  name: 'logCall',
  initialState,
  reducers: {
    updateData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },

});
export const getLog = (payload) => async (dispatch, getState) => {
  axios.get(
    process.env.REACT_APP_DATABASE_URL + "/api/logs/getAll"
  ).then(result => {
    dispatch(updateData({
      data: result.data
    }))
    console.log(result);
  }).catch(error => {

  });
}
export const saveLog = (payload) => async (dispatch, getState) => {
  axios.post(
    process.env.REACT_APP_DATABASE_URL + "/api/logs/addLog",
    {
      phoneNumber: payload.phoneNumber.toString(),
      timeCall: payload.timeCall,
      statusCall: payload.statusCall,
    }
  ).then(result => {
    dispatch(getLog());

  }).catch(error => {

  });
}

export const { updateData } = logCallSlice.actions;

export default logCallSlice.reducer;
