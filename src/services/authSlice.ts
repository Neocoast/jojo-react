import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'redux';

import type { AuthState, User } from './auth.interfaces';
import { api } from './api';

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('access-token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('expiry');
  dispatch(logout());
  // Vaciamos el caché de RTK Query para no mostrarle datos de esta cuenta al próximo usuario
  dispatch(api.util.resetApiState());
};

export default authSlice.reducer;
