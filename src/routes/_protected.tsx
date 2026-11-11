import { useState } from 'react';
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { TrendingTopics } from '@/components/TrendingTopics';

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
        <aside className="-my-6 -mr-6 hidden w-80 shrink-0 flex-col gap-6 border-l lg:flex border-border bg-white p-6">
          <div className="h-52 shrink-0 border-b border-border" />
          <TrendingTopics />
          <div />
        </aside>
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
