import { configureStore } from '@reduxjs/toolkit';
import typeracer from './reducer.js';

const store = configureStore({
  reducer: {
    typeracer,
  },
});

export default store;