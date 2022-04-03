import React from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPost } from '../../../../redux/actions/postsActions'
import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {

  const navigate = useNavigate()
  
  const dispatch = useDispatch()
    
    // const currentPostST = useSelector(state => state.setCurrentPost)
    // const { currentPost } = currentPostST
  
  return (
      <div className="card mb-3" style={{maxWidth: '700px'}}>
      <div className="row g-0">

      <div className="col-md-8">
        <div className="card-body">
          <p className="card-text fs-4">{post.text}</p>
          <p className="card-text"><small className="text-muted">{format(new Date(post.dateCreated), 'dd/MM/yyyy  hh:mm')}</small></p>
        </div>
        <div className='d-flex justify-content-between w-25 ms-3 mb-3'>
            <button
              className='btn btn-primary btn-sm'
              onClick={
                () => {
                  dispatch(setCurrentPost(post))
                  navigate('/management/add-post',{replace:true})
                }
              }
            >تعديل</button>
          <button className='btn btn-danger btn-sm'>حذف</button>
        </div>
      </div>

      {post.images && 
        <div className="col-md-4">
          <img src={"http://mhmodmj-001-site1.itempurl.com"+post.images} className="img-fluid rounded-start w-100 h-100" alt="صورة" />
        </div>
      }
      

    </div>
    </div>
    )
}

export default Post