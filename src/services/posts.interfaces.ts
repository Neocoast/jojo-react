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
  published_at: string;
  likes_count: number;
  liked?: boolean;
  commented?: boolean;
  author: PostAuthor;
  tags: Tag[];
  image_url?: string
}

export interface PostsResponse {
  posts: Posts[]
}
