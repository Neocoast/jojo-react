import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'react-hot-toast';

import { NotFound } from '@/components/NotFound';
import type { RouterContext } from '@/router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen">
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
});
