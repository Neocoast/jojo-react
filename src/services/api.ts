import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('access-token');
      const uid = localStorage.getItem('uid');
      const client = localStorage.getItem('client');

      if (accessToken && uid && client) {
        headers.set('access-token', accessToken);
        headers.set('uid', uid);
        headers.set('client', client);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
