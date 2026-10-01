import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

import type { RootState } from '@/services/store'
import { Posts } from '@/components/Posts'
import { Loader } from '@/components/Loader'
import { useGetFeedQuery, useGetPostsQuery } from '@/services/postsApi'

const RouteComponent = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const feedQuery = useGetFeedQuery(undefined, { skip: !isAuthenticated })
  const postsQuery = useGetPostsQuery(undefined, { skip: isAuthenticated })

  const { data, isLoading, error } = isAuthenticated ? feedQuery : postsQuery

  const posts = data?.posts ?? []

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>Something went wrong. Please try again.</p>
  }

  if (posts.length === 0) {
    return <p>Not posts yet.</p>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Posts posts={posts} />
    </div>
  )
}

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
})
