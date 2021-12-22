import { useLoaderData } from '@remix-run/react'
import { Link } from 'remix'
import { getPosts, Post } from '~/post'

export const loader = ()=> getPosts()

export default function Posts(){
  const posts = useLoaderData<Post[]>()
  return (
    <article>
      <h1>Posts</h1>
      <nav>
        <h1>menu</h1>
        <ul>
          {posts.map(post=>(
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}