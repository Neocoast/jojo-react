import { UserPlus } from 'lucide-react';

import type { User } from '@/services/users';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';

interface UserCardProps {
  user: User;
  isCurrentUser: boolean;
}

const UserCard = ({ user, isCurrentUser }: UserCardProps) => {
  let followStatus;

  if (isCurrentUser) {
    followStatus = null;
  } else if (user.followed) {
    followStatus = (
      <Button variant="secondary" className="h-10 px-4">
        Following
      </Button>
    );
  } else {
    followStatus = (
      <Button className="h-10 px-4">
        <UserPlus />
        Follow
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="size-10 shrink-0 overflow-hidden rounded-full">
        <Avatar name={user.name} size="100%" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{user.name}</p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
      </div>

      {followStatus}
    </div>
  );
};

export { UserCard };
