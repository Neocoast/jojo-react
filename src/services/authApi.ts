import { api } from './api';
import type { SignupPayload, SignupResponse } from './auth.interfaces';

export type { SignupPayload, SignupResponse };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
        responseHandler: async (response) => {
          const accessToken = response.headers.get('access-token');
          const client = response.headers.get('client');
          const uid = response.headers.get('uid');
          const expiry = response.headers.get('expiry')

          if (accessToken && uid && client && expiry) {
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('uid', uid);
            localStorage.setItem('client', client);
            localStorage.setItem('expiry', expiry);
          }

          return response.json();

        }
      }),
    }),

  }),
});

export const { useSignupMutation } = authApi;
