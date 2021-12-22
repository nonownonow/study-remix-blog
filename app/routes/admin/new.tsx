import { createPost, Post } from '~/post'
import { ActionFunction, Form, redirect, useActionData, useTransition } from 'remix'
import invariant from 'tiny-invariant'

type PostError = {
  title?: boolean
  slug?: boolean
  markdown?: boolean
}

export const action:ActionFunction = async ({request}) => {
  await new Promise(res=>setTimeout(res, 1000))
  const formData = await request.formData()
  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors:PostError = {}
  if(!title) errors.title = true
  if(!slug) errors.slug = true
  if(!markdown) errors.markdown = true

  if(Object.keys(errors).length){
    return errors
  }

  invariant(typeof title==='string')
  invariant(typeof slug==='string')
  invariant(typeof markdown==='string')
  await createPost({title, slug, markdown})
  return redirect("/admin")
}

export default function NewPost() {
  const errors = useActionData()
  const transition = useTransition()
  return (
    <Form method={"post"}>
      <h1>Create Post</h1>
      <section>
        <h1>test</h1>
      </section>
      <fieldset>
        <legend>meta</legend>
        <p>
          <label htmlFor={"title"}>Post Title:{" "}</label>
          {errors?.title?(<em>Title is required</em>):null}
          <input id="title" name="title" type={"text"}/>
        </p>
        <p>
          <label htmlFor={"slug"}>slug: {" "}</label>
          {errors?.slug?(<em>Slug is required</em>): null}
          <input id="slug" name="slug" type={"text"}/>
        </p>
      </fieldset>
      <fieldset>
        <legend>contents</legend>
        <p>
          <label htmlFor="markdown">markdown</label>
          {errors?.markdown?(<em>Markdown is required</em>):null}
          <textarea id="markdown" name="markdown" rows={20} />
        </p>
      </fieldset>
      <p>
        <button type="submit">
          {transition.submission
            ? "Creating..."
            : "Create Post"}
        </button>
      </p>
    </Form>
  )
}