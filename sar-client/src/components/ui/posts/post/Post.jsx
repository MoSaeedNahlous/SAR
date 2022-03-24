import React from 'react'

const Post = ({post}) => {
  return (
      <div>
          <h2>{post.desc}</h2>
          <small>{ post.date }</small>
          <button>Delete</button>
          <button>Edit</button>
    </div>
  )
}

export default Post