import { createPortal } from 'react-dom';
import { Loader2 } from 'lucide-react';

const FullPageLoader = () =>
  createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <Loader2 className="size-10 animate-spin text-primary" />
    </div>,
    document.body,
  );

export { FullPageLoader };
