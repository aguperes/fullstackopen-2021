import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, { payload }) {
      return payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let timer = undefined;
export const handleNotification = (message, delay) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      dispatch(clearNotification());
    }, delay * 1000);
  };
};

export default notificationSlice.reducer;
