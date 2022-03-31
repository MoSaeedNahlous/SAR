import React from 'react'

const Post = ({post}) => {
  return (
   
      <div className="card mb-3" style={{maxWidth: '700px'}}>
      <div className="row g-0">

      <div className="col-md-8">
        <div className="card-body">
          <p className="card-text fs-4">{post.desc}</p>
          <p className="card-text"><small className="text-muted">{post.date}</small></p>
        </div>
        <div className='d-flex justify-content-between w-25 ms-3 mb-3'>
          <button className='btn btn-primary btn-sm'>تعديل</button>
          <button className='btn btn-danger btn-sm'>حذف</button>
        </div>
      </div>

      <div className="col-md-4">
        <img src="https://via.placeholder.com/450" className="img-fluid rounded-start w-100 h-100" alt="صورة" />
      </div>

      

    </div>
    </div>
    )
}

export default Post