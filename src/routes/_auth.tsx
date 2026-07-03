import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: () => (
    <div className="bg-with-dots bg-cover min-h-screen bg-center">
      <Outlet />
    </div>
  ),
});
