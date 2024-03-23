import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isAuthenticated: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = actions;

export default reducer;
