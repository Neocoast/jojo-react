import { api } from './api';
import type { LoginPayload, LoginResponse, MeResponse, SignupPayload, SignupResponse } from './auth.interfaces';

export type { SignupPayload, SignupResponse };

const saveAuthTokensAndParse = async (response: Response) => {
  const accessToken = response.headers.get('access-token');
  const uid = response.headers.get('uid');
  const expiry = response.headers.get('expiry');
  const client = response.headers.get('client');

  if (accessToken && uid && client && expiry) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('uid', uid);
    localStorage.setItem('expiry', expiry);
    localStorage.setItem('client', client);
  }

  return response.json();
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
        responseHandler: saveAuthTokensAndParse,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/users/sign_in',
        method: 'POST',
        body,
        responseHandler: saveAuthTokensAndParse,
      }),
    }),

    getMe: builder.query<MeResponse, void>({
      query: () => '/users/me',
    }),

    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/users/sign_out',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useGetMeQuery, useSignOutMutation } = authApi;
