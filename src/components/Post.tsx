import { MoreVertical, Heart, MessageCircle, Repeat2, Share2, Send } from 'lucide-react';

import type { Posts } from '@/services/posts.interfaces';
import { Avatar } from '@/components/Avatar';

interface PostProps {
  post: Posts;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// La API devuelve imageUrl sin dominio ("/rails/..."), así que le sumamos el del backend
const API_ORIGIN = new URL(import.meta.env.VITE_API_URL).origin;

const formatTime = (fecha: Date) => {
  let hours = fecha.getHours();
  const minutes = String(fecha.getMinutes()).padStart(2, '0');

  let period;
  if (hours >= 12) {
    period = 'p.m';
  } else {
    period = 'a.m';
  }

  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
};

const formatPublished = (publishedAt: string) => {
  const fecha = new Date(publishedAt);
  const today = new Date();

  // Comparamos solo los días (a las 00:00) para que "yesterday" sea el día
  // anterior en el calendario, no "hace 24 horas".
  const publishedDay = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysAgo = Math.round((currentDay.getTime() - publishedDay.getTime()) / MS_PER_DAY);

  // Si el reloj de la compu está atrasado, un post recién creado puede quedar "en el futuro"
  if (daysAgo <= 0) {
    return formatTime(fecha);
  } else if (daysAgo === 1) {
    return 'Yesterday';
  } else if (daysAgo < 7) {
    return `${daysAgo} days ago`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);

    if (weeksAgo === 1) {
      return '1 week ago';
    } else {
      return `${weeksAgo} weeks ago`;
    }
  } else {
    const monthsAgo = Math.floor(daysAgo / 30);

    if (monthsAgo === 1) {
      return '1 month ago';
    } else {
      return `${monthsAgo} months ago`;
    }
  }
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
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 wrap-break-word text-base font-medium leading-7 text-foreground">{post.title}</h3>
        <span className="shrink-0 text-xs text-muted-foreground">{formatPublished(post.publishedAt)}</span>
      </div>

      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <span key={tag.id} className="text-xs font-normal leading-4 text-foreground bg-muted rounded-full px-3 py-1">
            {tag.slug}
          </span>
        ))}
      </div>

      <p className="whitespace-pre-line wrap-break-word text-base font-normal leading-6 text-muted-foreground">{post.body}</p>

      {post.imageUrl && (
        <img src={new URL(post.imageUrl, API_ORIGIN).href} alt={post.title} className="w-full rounded-lg object-cover" />
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-normal leading-none text-primary">
        <span className="flex items-center gap-1.5">
          <Heart className="size-4" /> {post.likesCount} Likes
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
      <Send className="size-4 text-muted-foreground" />
    </div>
  </div>
);

export { Post };
