import { createFileRoute } from '@tanstack/react-router'
import { skipToken } from '@reduxjs/toolkit/query'

import { CreatePostForm } from '@/components/CreatePostForm'
import { Posts } from '@/components/Posts'
import { Loader } from '@/components/Loader'
import { useGetMeQuery } from '@/services/authApi'
import { useGetUserPostsQuery } from '@/services/postsApi'

const RouteComponent = () => {
  const { data: user, isLoading: isUserLoading, error: userError } = useGetMeQuery()

  const postsQuery = useGetUserPostsQuery(user ? user.id : skipToken)

  const posts = postsQuery.data?.posts ?? []
  const isLoading = isUserLoading || postsQuery.isLoading
  const error = userError || postsQuery.error

  let content;
  if (isLoading) {
    content = <Loader />
  } else if (error) {
    content = <p>Something went wrong. Please try again.</p>
  } else if (posts.length === 0) {
    content = <p>You haven't posted anything yet.</p>
  } else {
    content = <Posts posts={posts} />
  }

  return (
    <div className="max-w-2xl flex flex-col gap-4">
      <CreatePostForm />
      {content}
    </div>
  )
}

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
})
