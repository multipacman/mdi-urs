import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import authReducer from './slices/auth';

const reducer = {
  user: userReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
