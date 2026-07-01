import type { LucideIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { cn } from '@/lib/utils';

const NAV_ITEM_CLASSNAME = 'flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent';

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  link?: string;
  onClick?: () => void;
}

const NavButton = ({ icon: Icon, label, link, onClick }: NavButtonProps) => {
  const content = (
    <>
      <Icon className="size-4" />
      {label}
    </>
  );

  if (link) {
    return (
      <Link to={link} className={cn(NAV_ITEM_CLASSNAME, '[&.active]:bg-accent')}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cn(NAV_ITEM_CLASSNAME, 'text-left')}>
      {content}
    </button>
  );
};

export { NavButton };
