import type { User } from '@/services/users';
import { Avatar } from '@/components/Avatar';
import { UserPlus } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {

  let followStatus;

  if(user.followed){
    followStatus = (
      <span className="rounded-lg items-center bg-gray-100 px-4 py-2 text-sm text-blue-700 h-10 content-center">
        Following
      </span>
    );
  } else {
    followStatus = (
      <span className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 -py-2 text-sm text-white h-10">
        <UserPlus className="size-4" />
        Follow
      </span>
    )
  }
  return (
    <div className="flex items-center gap-3 py-4 border-b border-[lightgray]">
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
