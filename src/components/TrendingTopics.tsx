import { useState } from 'react';

import { TrendingTopicsModal } from '@/components/TrendingTopicsModal';
import { useGetMeQuery } from '@/services/authApi';

const TrendingTopics = () => {
  const { data: user } = useGetMeQuery();
  const [appliedTags, setAppliedTags] = useState<string[]>(() => JSON.parse(localStorage.getItem('trending-topics') ?? '[]'));

  const favoriteTags = user?.favoriteTags.map((tag) => tag.slug) ?? [];
  const visibleTags = appliedTags.length > 0 ? appliedTags : favoriteTags;

  const applyTags = (tags: string[]) => {
    localStorage.setItem('trending-topics', JSON.stringify(tags));
    setAppliedTags(tags);
  };

  return (
    <section className="flex flex-col gap-6 border-b border-border pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Your Preferences</h2>
        <TrendingTopicsModal appliedTags={appliedTags} onApply={applyTags} />
      </div>

      <ul className="flex flex-wrap gap-4">
        {visibleTags.map((slug) => (
          <li key={slug} className="rounded-full bg-blue-50 px-3 py-1 text-sm">
            #{slug}
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TrendingTopics };
