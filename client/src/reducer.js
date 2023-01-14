import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rWpm: 0,
  rUser: '',
};

const typeRacerSlice = createSlice({
  name: 'typeracer_',
  initialState,
  reducers: {
    updateWPM: (state, action) => {
      state.rWpm = action.payload;
    },
    updateUser: (state, action) => {
      state.rUser = action.payload;
    },
  },
});

export const { updateWPM, updateUser } = typeRacerSlice.actions;

export default typeRacerSlice.reducer;