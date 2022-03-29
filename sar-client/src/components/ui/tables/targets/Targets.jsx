import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TARGET_RESET, SET_CURRENT_TARGET_RESET, UPDATE_TARGET_RESET } from '../../../../redux/constants/targetsConstants'

const Targets = () => {
    
    const dispatch = useDispatch()
    
    const currentTarget = useSelector(state => state.setCurrentTarget)
    const { currentTarget: current } = currentTarget
    
    const target = useSelector((state) => state.getTarget);
    const { target: targetList, error, loading } = target;

    const deleteTargetSt = useSelector((state) => state.deleteTarget);
    const { success, error: deleteError, loading: deleteLoading } = deleteTargetSt;

    const addTargetSt = useSelector((state) => state.addTarget);
    const { success:addSuccess, error: addError, loading: addLoading } = addTargetSt;
    
    const updateTargetSt = useSelector((state) => state.updateTarget);
    const {success:updateSuccess, error:updateError, loading:updateLoading } = updateTargetSt;

    useEffect(() => {
        dispatch({ type: SET_CURRENT_TARGET_RESET })
        dispatch({ type: UPDATE_TARGET_RESET })
        dispatch({ type: ADD_TARGET_RESET })
        // dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (success || updateSuccess ||addSuccess) {
        //   dispatch(getCategories());
      }
    }, [success, updateSuccess,addSuccess])
    

    const deleteHandler = (id) => {
        // dispatch(deleteCategory(id))
        
    }

    const showHandler = (id) => {
        // dispatch(showCategory(id))
    }

    const hideHandler = (id) => {
        // dispatch(hideCategory(id))
    }

    

    if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
  }

  return (
      <div>
          { error && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_TARGET_RESET }) } }>{ error }</Alert> }
          { success && <Alert onClose={() => {dispatch({type:DELETE_TARGET_RESET})}}>تم الحذف بنجاح</Alert> }
          { deleteError && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_TARGET_RESET }) } }>{ deleteError }</Alert> }
          
    <h3 className='text-center mb-3'>المخصصات</h3>
    <table className='table table-striped mx-auto w-75' dir='rtl'>
        <thead className='bg-primary text-white'>
            <tr className='py-5'>
                <th>ID</th>
                <th>الاسم</th>
                <th className='text-center'>خيارات</th>
            </tr>
        </thead>
        <tbody>
            {/* { targetList.map(target => (
                <tr>
                    <td>{ cat.id }</td>
                    <td>{ cat.name }</td>
                    <td className='d-flex justify-content-center'><button className='btn btn-danger mx-2'>حذف</button> <button className='btn btn-primary'>تعديل</button>
                        <FormControlLabel control={
            <Checkbox
                name="Show"
            />
        } label="إظهار" />
                    </td>
                </tr>
            ))} */}
        </tbody>
    </table>
    
</div>
  )
}

export default Targets