import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: ( value: string ) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps ) => (
  <div className="rounded-xl bg-white px-6 py-4 shadow-sm">
    <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
      {value === '' && <Search className="size-5 shrink-0 text-gray-400" />}

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search..."
        className="flex-1 min-w-0 bg-transparent outline-none"/>

        {value !== '' && (
          <button type="button" onClick={() => onChange('')}>
            <X className="size-5 trext-gray-500" />
          </button>
        )}
    </div>
  </div>
);

export { SearchBar };
