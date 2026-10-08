import { Sparkles } from 'lucide-react';
import toast, { type Toast } from 'react-hot-toast';

import { cn } from '@/lib/utils';

const TOAST_DURATION = 4000;

interface SuccessToastProps {
  t: Toast;
  title: string;
  message: string;
}

const SuccessToast = ({ t, title, message }: SuccessToastProps) => (
  <div
    className={cn(
      'group relative w-full max-w-md overflow-hidden rounded-md bg-white p-6 shadow-lg flex items-start justify-between gap-4',
      t.visible ? 'animate-in fade-in slide-in-from-top-2' : 'animate-out fade-out'
    )}
  >
    <div className="flex flex-col gap-2">
      <p className="text-2xl leading-8 text-primary">{title}</p>
      <p className="text-base font-light leading-6 text-foreground">{message}</p>
    </div>
    <Sparkles className="size-10 shrink-0 text-primary" strokeWidth={1.25} />

    {/* Barra que se llena de azul mientras el toast está abierto */}
    <div
      className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-primary/0 animate-toast-progress group-hover:[animation-play-state:paused]"
      style={{ animationDuration: `${TOAST_DURATION}ms` }}
    />
  </div>
);

const showSuccessToast = (title: string, message: string) => {
  toast.custom((t) => <SuccessToast t={t} title={title} message={message} />, {
    duration: TOAST_DURATION,
  });
};

export { showSuccessToast };
