import { FileText, Menu } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => (
  <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-sidebar-border bg-white">
    <div className="flex items-center">
      <FileText className="size-6 text-primary" />
      <span className="text-primary text-xl font-medium ml-1.5">Neoposts</span>
    </div>
    <button onClick={onToggleSidebar} className="md:hidden">
      <Menu className="size-5" />
    </button>
  </header>
);

export { Navbar };
