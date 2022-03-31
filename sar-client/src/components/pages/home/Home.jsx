import React from 'react'
import Posts from '../../ui/posts/Posts'
import { posts }  from '../../ui/posts/dummy-posts'

const Home = () => {
  return (
      <div>
          
          <Posts data={posts}/>
      </div>
      
  )
}

export default Home