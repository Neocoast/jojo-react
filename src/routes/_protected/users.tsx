import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { usersSearchSchema } from '@/validations/users';
import { useGetUsersQuery } from '@/services/users';
import type { User } from '@/services/users';
import { Loader } from '@/components/Loader';
import { UserCard } from '@/components/UserCard';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';


const users_page = 10;

const UsersPage = () => {
  const { search, page } = Route.useSearch();
  const { data, isLoading, isError } = useGetUsersQuery({ search });

  let initialText = '';
  if (search !== undefined) {
    initialText = search;
  }
  const [searchText, setSearchText] = useState(initialText);

  const navigate = useNavigate({ from: Route.fullPath });

  useEffect(() => {
    if (searchText === initialText) {
      return;
    }

    const timeout = setTimeout(() => {
      let newSearch;
      if (searchText === '') {
        newSearch = undefined;
      } else {
        newSearch = searchText;
      }

      navigate({ search: { search: newSearch, page: 1 } });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText, initialText, navigate]);

  const start = (page - 1) * users_page;
  const end = start + users_page;

  let pageUsers: User[] = [];
  let totalUsers = 0;
  if (data !== undefined) {
    pageUsers = data.users.slice(start, end);
    totalUsers = data.users.length;
  }

  const totalPages = Math.ceil(totalUsers / users_page);

  let hasPreviousPage = false;
  if (page > 1) {
    hasPreviousPage = true;
  }

  let hasNextPage = false;
  if (end < totalUsers) {
    hasNextPage = true;
  }

  const anotherPage = (newPage: number) => {
    navigate({ search: {search, page: newPage }});
  };

  let content;

  if (isLoading) {
    content = <Loader />
  } else if (isError) {
    content = <p>Something went wrong loading users. Please try again.</p>
  } else if (pageUsers.length === 0) {
    content = <p>No users found.</p>
  } else {
    content = (
      <>
        <div className="bg-white rounded-lg px-4 w-full max-w-[676px] divide-y divide-gray-200">
          {pageUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={anotherPage}
        />
     </>
    );
  }

return (
    <div className="flex flex-col gap-4 w-full max-w-[676px]">
      <SearchBar value={searchText} onChange={setSearchText} />
      {content}
    </div>
  );
};

export const Route = createFileRoute('/_protected/users')({
  validateSearch: usersSearchSchema,
  component: UsersPage,
});
