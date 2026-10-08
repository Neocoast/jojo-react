import { api } from './api'
import type { CreatePostPayload, PostsResponse } from './posts.interfaces'

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<PostsResponse, number>({
      providesTags: ['Post'],
      query: (userId) => ({ url: '/posts', params: { user_id: userId } }),
    }),
    createPost: builder.mutation<void, CreatePostPayload>({
      // Al crear un post, RTK Query vuelve a pedir las listas marcadas con 'Post'
      invalidatesTags: ['Post'],
      query: (payload) => {
        const requestBody = { post: payload }

        return {
          url: '/posts',
          method: 'POST',
          body: requestBody,
        }
      },
    }),
  }),
})

export const { useGetUserPostsQuery, useCreatePostMutation } = postsApi
