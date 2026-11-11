import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useGetTagsQuery } from '@/services/tagsApi';

const MAX_SELECTED_TAGS = 3;

interface TrendingTopicsModalProps {
  appliedTags: string[];
  onApply: (tags: string[]) => void;
}

const TrendingTopicsModal = ({ appliedTags, onApply }: TrendingTopicsModalProps) => {
  const { data: tags = [] } = useGetTagsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [draftTags, setDraftTags] = useState<string[]>([]);

  const isLimitReached = draftTags.length >= MAX_SELECTED_TAGS;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDraftTags(appliedTags);
    }
    setIsOpen(open);
  };

  const toggleTag = (slug: string) => {
    if (draftTags.includes(slug)) {
      setDraftTags(draftTags.filter((tag) => tag !== slug));
    } else if (!isLimitReached) {
      setDraftTags([...draftTags, slug]);
    }
  };

  const applySelection = () => {
    onApply(draftTags);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="link" className="h-auto p-0 font-normal">
          See All
          <ArrowUpRight />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-8 p-6 sm:max-w-175 [&>[data-slot=dialog-close]]:top-6 [&>[data-slot=dialog-close]]:right-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">Your Preferences</DialogTitle>
          <DialogDescription>You can select up to three simultaneously.</DialogDescription>
        </DialogHeader>

        <ul className="flex max-h-[50vh] flex-wrap gap-x-4 gap-y-3 overflow-y-auto p-1">
          {tags.map((tag) => {
            const isSelected = draftTags.includes(tag.slug);

            return (
              <li key={tag.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  disabled={!isSelected && isLimitReached}
                  onClick={() => toggleTag(tag.slug)}
                  className={cn(
                    'h-5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs disabled:opacity-50',
                    isSelected && 'bg-white ring-2 ring-primary'
                  )}
                >
                  #{tag.slug}
                </button>
              </li>
            );
          })}
        </ul>

        <DialogFooter>
          <Button type="button" variant="outline" className="min-w-20 bg-white px-4 leading-6 text-foreground" onClick={() => setDraftTags([])}>
            Clean
          </Button>
          <Button type="button" className="min-w-20 leading-6" onClick={applySelection}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { TrendingTopicsModal };
