import { useState } from 'react';
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleSidebar={() => setIsSidebarOpen((currentState) => !currentState)} />
      <div className="flex flex-1 gap-6 p-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ProtectedLayout,
});
