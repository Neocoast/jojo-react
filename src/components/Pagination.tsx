import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ page, totalPages, hasPreviousPage, hasNextPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between">
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={!hasPreviousPage} className="flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm shadow-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-50" >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>

      <button type="button" onClick={() => onPageChange(page + 1)} disabled={!hasNextPage} className="flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm shadow-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-50">
        Next
        <ChevronRight className="size-4"/>
      </button>
    </nav>
  );
};

export { Pagination };
