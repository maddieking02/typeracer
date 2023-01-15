import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstnameReducer: '',
  lastnameReducer: '',
  emailReducer: '',
  avgWpmReducer: 0,
  userReducer: '',
  passwordReducer: '',
};

const typeRacerSlice = createSlice({
  name: 'typeracer_',
  initialState,
  reducers: {
    updateFirstname: (state, action) => {
      state.firstnameReducer = action.payload;
    },
    updateLastname: (state, action) => {
      state.lastnameReducer = action.payload;
    },
    updateEmail: (state, action) => {
      state.emailReducer = action.payload;
    },
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

export const {
  updateFirstname, updateLastname, updateEmail, updateWPM, updateUser, updatePassword,
} = typeRacerSlice.actions;

export default typeRacerSlice.reducer;