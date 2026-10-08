import type { Tag } from "./tagsApi";

interface PostAuthor {
  id: number
  name: string
  email: string
}

export interface Posts {
  id: number;
  title: string;
  body: string;
  publishedAt: string;
  likesCount: number;
  liked?: boolean;
  commented?: boolean;
  author: PostAuthor;
  tags: Tag[];
  imageUrl?: string | null
}

export interface PostsResponse {
  posts: Posts[]
}

export interface CreatePostPayload {
  title: string;
  body: string;
  tags: string[]
}
