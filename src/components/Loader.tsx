import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => (
  <div className={cn('flex items-center justify-center py-10', className)}>
    <Loader2 className="size-6 animate-spin text-primary" />
  </div>
);

export { Loader };
