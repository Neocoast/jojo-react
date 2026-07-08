import { Link } from '@tanstack/react-router';
import notFoundImg from '@/assets/images/404.png';

type NotFoundProps = {
  className?: string;
};

export const NotFound = ({ className }: NotFoundProps) => (
  <div
    className={`min-h-screen bg-white bg-no-repeat bg-bottom bg-size-[auto_37.8rem] flex flex-col items-center justify-center gap-4 p-4 text-center ${className ?? ''}`}
    style={{ backgroundImage: `url(${notFoundImg})` }}
  >
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-foreground text-3xl font-medium leading-none text-center">Page not found</h1>
      <p className="text-muted-foreground text-xl font-normal leading-7 text-center">We couldn't find the page you were looking for.</p>
      <Link to="/" className="bg-primary text-white text-sm rounded-md hover:bg-primary/90 flex justify-center items-center gap-1 py-2 px-3 w-50 min-w-20">
        Go back
      </Link>
    </div>
  </div>
);
