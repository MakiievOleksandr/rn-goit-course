import { createSlice } from '@reduxjs/toolkit';

export const state = {
  userId: null,
  nickName: null,
  stateChange: false,
};
export const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    nickName: payload.nickName,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authLogOut: () => state,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: actions,
});
// console.log('ACTION:', authSlice.actions.updateUserProfile());
// console.log('ACTION:', authSlice.actions.authStateChange());
