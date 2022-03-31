import React from 'react'
import Post from './post/Post'

const Posts = ({data}) => {
  return (
    <div className='container'>
      <h1 className='mb-5 mt-3'>آخر الأخبار</h1>
      <button className='btn btn-primary mb-3'> إضافة منشور</button>
    {
    data.map(post => (
      <Post post={post} key={post.id}/>
    ))
  }
    </div>
  )
}

export default Posts