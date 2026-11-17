import type { Posts as PostType } from '@/services/posts.interfaces';
import { Post } from '@/components/Post';

interface PostsProps {
  posts: PostType[];
}

const Posts = ({ posts }: PostsProps) => (
  <div className="flex flex-col gap-4">
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

export { Posts };
