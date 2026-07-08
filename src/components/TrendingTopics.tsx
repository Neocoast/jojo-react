import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useGetMeQuery } from '@/services/authApi';

const TrendingTopics = () => {
  const { data: user } = useGetMeQuery();
  const favoriteTags = user?.favoriteTags ?? [];

  return (
    <section className="flex flex-col gap-6 border-b border-border pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Trending Topics</h2>
        {/* TODO: abrir el modal con todos los tags */}
        <Button type="button" variant="link" className="h-auto p-0 font-normal">
          See All
          <ArrowUpRight />
        </Button>
      </div>

      <ul className="flex flex-wrap gap-4">
        {favoriteTags.map((tag) => {
          return (
            <li key={tag.id} className="rounded-full bg-blue-50 px-3 py-1 text-sm">
              #{tag.slug}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export { TrendingTopics };
