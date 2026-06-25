import { api } from './api';

export interface Tag {
  id: number;
  slug: string;
}

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
