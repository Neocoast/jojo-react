import { MoreVertical, Heart, MessageCircle, Repeat2, Share2, Smile, Send } from 'lucide-react';

import type { Posts } from '@/services/posts.interfaces';
import { Avatar } from '@/components/Avatar';

interface PostProps {
  post: Posts;
}

const formatPublished = (publishedAt: string) => {
  const fecha = new Date(publishedAt);

  const formattedDate = fecha.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return formattedDate;
};

const Post = ({ post }: PostProps) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <Avatar name={post.author.name} size={40} className="rounded-full" />
      <div className="flex-1">
        <p className="font-semibold text-sm">{post.author.name}</p>
        <p className="text-xs text-muted-foreground">{post.author.email}</p>
      </div>
      <button aria-label="Post options">
        <MoreVertical className="size-4 text-muted-foreground" />
      </button>
    </div>

    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium leading-7 text-foreground">{post.title}</h3>
        <span className="text-xs text-muted-foreground">{formatPublished(post.published_at)}</span>
      </div>

      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <span key={tag.id} className="text-xs font-normal leading-4 text-foreground bg-muted rounded-full px-3 py-1">
          </span>
        ))}
      </div>

      <p className="text-base font-normal leading-6 text-muted-foreground">{post.body}</p>

      <div className="flex items-center gap-6 text-sm font-normal leading-none text-primary">
        <span className="flex items-center gap-1.5">
          <Heart className="size-4" /> {post.likes_count} Likes
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="size-4" /> 0 Comments
        </span>
        <span className="flex items-center gap-1.5">
          <Repeat2 className="size-4" /> 0 Re-posts
        </span>
        <span className="flex items-center gap-1.5">
          <Share2 className="size-4" /> 0 Share
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3 border-t border-border pt-3">
      <Avatar name={post.author.name} size={32} className="rounded-full" />
      <input
        type="text"
        placeholder="Write your comment..."
        className="flex-1 text-sm outline-none"
      />
      <Smile className="size-4 text-muted-foreground" />
      <Send className="size-4 text-muted-foreground" />
    </div>
  </div>
);

export { Post };
