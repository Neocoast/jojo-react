import { api } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  followed?: boolean;
}

export interface GetUsersResponse {
  users: User[];
}

export interface GetUsersParams {
  search?: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
