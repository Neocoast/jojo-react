import { useNavigate } from '@tanstack/react-router';
import { Home, UserPlus, Heart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/services/store';

import { logoutUser } from '@/services/authSlice';
import { useGetMeQuery, useSignOutMutation } from '@/services/authApi';
import { NavButton } from '@/components/NavButton';
import { UserStat } from '@/components/UserStat';
import { cn } from '@/lib/utils';

const ROUTES = {
  login: '/login',
} as const;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { data: user } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const [signOut] = useSignOutMutation();

  const handleLogout = async () => {
    await signOut();

    dispatch(logoutUser());
    navigate({ to: ROUTES.login });
  };

  return (
      <div
        className={cn(
          'flex flex-col gap-4 w-64 shrink-0 fixed inset-y-0 left-0 z-30 pt-4 px-4 bg-transparent transition-transform',
          'md:relative md:translate-x-0 md:pt-0 md:px-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-36 bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-semibold text-primary">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
          </div>
          <div className='flex m-4'>
            <UserStat label="FOLLOWING" count={user?.followees.length ?? 0} />
            <UserStat label="FOLLOWERS" count={user?.followers.length ?? 0} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <NavButton icon={Home} label="Home" link="/" />
          <NavButton icon={UserPlus} label="Friends" />
          <NavButton icon={Heart} label="Likes" />
          <NavButton icon={LogOut} label="Log Out" onClick={handleLogout} />
        </div>
      </div>
  );
};

export { Sidebar };
