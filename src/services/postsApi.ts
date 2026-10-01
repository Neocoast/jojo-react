import { api } from './api'
import type { PostsResponse } from './posts.interfaces'

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      providesTags: ['Post'],
      query: () => ({ url: '/posts' }),
    }),
    getFeed: builder.query<PostsResponse, void>({
      providesTags: ['Post'],
      query: () => ({ url: '/feed' }),
    }),
  }),
})

export const { useGetPostsQuery, useGetFeedQuery } = postsApi
