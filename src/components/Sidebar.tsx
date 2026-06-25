import { Link, useNavigate } from '@tanstack/react-router';
import { Home, UserPlus, Heart, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { logout } from '@/services/authSlice';
import { useGetMeQuery, useSignOutMutation } from '@/services/authApi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery();
  const [signOut] = useSignOutMutation();

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem('access-token');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    dispatch(logout());
    navigate({ to: '/login' });
  };

  return (
    <>
      <div className={`flex flex-col gap-4 w-64 shrink-0 fixed inset-y-0 left-0 z-30 pt-4 px-4 bg-transparent transition-transform md:relative md:translate-x-0 md:pt-0 md:px-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold tracking-widest text-muted-foreground">FOLLOWING</span>
              <span className="text-primary font-semibold">{user?.followees.length ?? 0}</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold tracking-widest text-muted-foreground">FOLLOWERS</span>
              <span className="text-primary font-semibold">{user?.followers.length ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent [&.active]:bg-accent">
            <Home className="size-4" />
            Home
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent text-left">
            <UserPlus className="size-4" />
            Friends
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent text-left">
            <Heart className="size-4" />
            Likes
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-accent text-left">
            <LogOut className="size-4" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
