import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.services';

const accessToken = JSON.parse(localStorage.getItem('authToken'));

const initialState = {
  token_type: accessToken?.token_type ?? null,
  expires_in: accessToken?.expires_in ?? null,
  access_token: accessToken?.access_token ?? null,
  refresh_token: accessToken?.refresh_token ?? null,
};

export const userLogin = createAsyncThunk('auth/userLogin', async payload => {
  try {
    const data = await authService.userLogin(payload);
    let response = { data: data.data };
    return response;
  } catch (error) {}
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // Add user to the state array
      authService.storeUserAccessToken(
        action?.payload?.data.token_type,
        action?.payload?.data.expires_in,
        action?.payload?.data.access_token,
        action?.payload?.data.refresh_token
      );

      return JSON.parse(localStorage.getItem('authToken'));
    });
  },
});

const { reducer } = authSlice;
export default reducer;
