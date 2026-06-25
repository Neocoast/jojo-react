import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'react-hot-toast'

export const Route = createRootRoute({
  component: () => (
    <div className="bg-with-dots bg-cover min-h-full bg-center">
      <Toaster />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
