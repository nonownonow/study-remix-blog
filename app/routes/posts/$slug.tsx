import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from 'remix'
import { getPost } from '~/post'

export const loader:LoaderFunction = async ({params}) => {
  return getPost(params.slug)
}

export default function PostSlug(){
  const post = useLoaderData()
  return (
    <div>
      <h1>Some Post: {post.title}</h1>
      <div dangerouslySetInnerHTML={{__html:post.body}}/>
    </div>
  )
}