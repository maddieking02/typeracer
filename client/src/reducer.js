import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  avgWpmReducer: 0,
  userReducer: '',
  passwordReducer: '',
};

const typeRacerSlice = createSlice({
  name: 'typeracer_',
  initialState,
  reducers: {
    updateWPM: (state, action) => {
      state.avgWpmReducer = action.payload;
    },
    updateUser: (state, action) => {
      state.userReducer = action.payload;
    },
    updatePassword: (state, action) => {
      state.passwordReducer = action.payload;
    },
  },
});

export const { updateWPM, updateUser, updatePassword } = typeRacerSlice.actions;

export default typeRacerSlice.reducer;