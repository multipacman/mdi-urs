import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/user.services';

const initialState = {
  accountInfo: null,
};

export const getUserDetails = createAsyncThunk(
  'user/userDetails',
  async accessToken => {
    try {
      const data = await userService.getUserDetails(accessToken);
      let response = { accountInfo: data.data };
      return response;
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      //   console.log(state, action);
      state.accountInfo = action?.payload?.accountInfo.result;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
