import { api } from './api';

export interface Tag {
  id: number;
  slug: string;
};

export interface SignupPayload {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  tags: string[];
}

export interface SignupResponse {
  data: {
    id: number;
    email: string;
    name: string;
  }
};

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

    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
    }),
  }),
});

export const { useSignupMutation, useGetTagsQuery } = authApi;
