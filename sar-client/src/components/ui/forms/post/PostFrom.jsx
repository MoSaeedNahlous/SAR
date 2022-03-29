import React from 'react'

const PostFrom = () => {
  return (
    <div>
        <h1 className='my-5 text-center'>إضافة منشور</h1>
        <form className='w-50 mx-auto' dir='rtl'>
            <div className='form-group'>
                <lable htmlFor='post-content' className='form-label'>محتوى المنشور</lable>
                <textarea className='form-control' name='post-content mt-2'></textarea>
            </div>
            <div className='form-group'>
                <label htmlFor='form-file mb-2' className='form-label'>صورة</label>
                <input type='file' className='form-control' name='form-file'/>
            </div>
            <button className='btn btn-primary px-5 mt-4'>أضف</button>
        </form>
       
    </div>
  )
}

export default PostFrom