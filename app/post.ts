import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'

export type Post = {
  slug: string;
  title: string;
}

export type PostMarkdownAttributes = {
  title: string
}

type NewPost = {
  title: string
  slug: string
  markdown: string
}
const postsPath = path.join(__dirname, "..", "app/posts")

function isValidPostAttributes(
  attributes: any
):attributes is PostMarkdownAttributes{
  return attributes?.title
}

export function getPosts() {
  const posts: Post[] = [
    {
      slug: "my-first-post",
      title: "My First Post"
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You"
    }
  ];
  return posts;
}

export async function getPost(slug: string|undefined) {
  const filePath = path.join(postsPath, `${slug}.md`)
  const file = await fs.readFile(filePath)
  const {attributes, body} = parseFrontMatter(file.toString())
  invariant(isValidPostAttributes(attributes), `${file} has invaild meta data`)
  return {
    slug,
    body,
    title: attributes.title
  }
}

export async function createPost(post:NewPost){
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`
  await fs.writeFile(
    path.join(postsPath, `${post.slug}.md`),md
  )
  return getPost(post.slug)
}
