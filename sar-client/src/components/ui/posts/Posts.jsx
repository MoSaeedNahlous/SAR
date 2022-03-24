import React from 'react'
import Post from './post/Post'

const Posts = ({data}) => {
  return (
    <div>
      <h1>Latest Posts</h1>
      <button>Add Post</button>
    {
    data.map(post => (
      <Post post={post}  key={post.id}/>
    ))
  }
      </div>
  )
}

export default Posts