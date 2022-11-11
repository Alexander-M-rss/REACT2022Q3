import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './stateSlice';

const store = configureStore({
  reducer: {
    state: stateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
