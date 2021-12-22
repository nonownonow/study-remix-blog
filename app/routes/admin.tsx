import { getPosts, Post } from '~/post'
import { Link, useLoaderData, Outlet} from 'remix'
import adminStyles from '../styles/admin.css'

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPosts()
}

export default function Admin() {
  const posts = useLoaderData<Post[]>()
  return (
    <article className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map(post=>(
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet/>
      </main>
    </article>
  )
}