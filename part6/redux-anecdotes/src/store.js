import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './slices/anecdotesSlice';
import notificationReducer from './slices/notificationSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
