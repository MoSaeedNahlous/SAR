import { Alert, Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategories, hideCategory, showCategory } from '../../../../redux/actions/categoriesActions'
import { ADD_CATEGORY_RESET, DELETE_CATEGORY_RESET, GET_CATEGORIES_RESET, SET_CURRENT_CATEGORY, SET_CURRENT_CATEGORY_RESET, UPDATE_CATEGORY_RESET} from '../../../../redux/constants/categoriesConstants'

const Categories = () => {

    const dispatch = useDispatch()
    
    const currentCategory = useSelector(state => state.setCurrentCategory)
    const { currentCategory: current } = currentCategory
    
    const categories = useSelector((state) => state.getCategories);
    const { categories: categoriesList, error, loading } = categories;

    const deleteCategorySt = useSelector((state) => state.deleteCategory);
    const { success, error: deleteError, loading: deleteLoading } = deleteCategorySt;

    const addCategorySt = useSelector((state) => state.addCategory);
    const { success:addSuccess, error: addError, loading: addLoading } = addCategorySt;
    
    const updateCategorySt = useSelector((state) => state.updateCategory);
    const {success:updateSuccess, error:updateError, loading:updateLoading } = updateCategorySt;

    useEffect(() => {
        dispatch({ type: SET_CURRENT_CATEGORY_RESET })
        dispatch({ type: UPDATE_CATEGORY_RESET })
        dispatch({ type: ADD_CATEGORY_RESET })
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (success || updateSuccess ||addSuccess) {
          dispatch(getCategories());
      }
    }, [success, updateSuccess,addSuccess])
    

    const deleteHandler = (id) => {
        dispatch(deleteCategory(id))
        
    }

    const showHandler = (id) => {
        dispatch(showCategory(id))
    }

    const hideHandler = (id) => {
        dispatch(hideCategory(id))
    }

    

    if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
    }
    
    if (error) {
        return <Alert variant='error'>{ error }</Alert>
    }


  return (
      <div>
          
          { error && <Alert variant='error'>{ error }</Alert> }
          { success && <Alert onClose={() => {dispatch({type:DELETE_CATEGORY_RESET})}}>تم الحذف بنجاح</Alert> }
          { deleteError && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_CATEGORY_RESET }) } }>{ deleteError }</Alert> }
          
          <h3 className='text-center mb-3'>الأصناف الرئيسية</h3>
          
          <table className='table table-striped mx-auto w-75' dir='rtl'>
              <thead className='bg-primary text-white'>
                  <tr className='py-5'>
                      <th>ID</th>
                      <th>الاسم</th>
                      <th className='text-center'>خيارات</th>
                  </tr>
              </thead>
              <tbody>
                  { categoriesList.map(cat => (
                      <tr key={cat.catID}>
                          <td>{ cat.catID }</td>
                          <td>{ cat.catName }</td>
                          <td className='d-flex justify-content-center'>
                              <button
                                  className='btn btn-danger mx-2'
                                  
                                  onClick={ () => deleteHandler(cat.catID) }
                                  disabled={ deleteLoading }
                              >
                                  {deleteLoading ?  <CircularProgress color="inherit"  size={15} /> :
                                  'حذف'
                             } </button>
                              <button className='btn btn-primary'
                                  onClick={
                                      () => {
                                          dispatch({ type: SET_CURRENT_CATEGORY, payload: cat }),
                                        document.getElementById('root').scrollIntoView({behavior:'smooth'})
                                      } }
                              >تعديل</button>
                              <FormControlLabel
                                  control={
                                      <Checkbox 
                                            defaultChecked ={ cat.cstate != 0 }
                                            name="Show"
                                            onClick={ cat.cstate != 0 ?
                                              () => hideHandler(cat.catID) :
                                              () => showHandler(cat.catID)
                                          }
                                    />
                                } label="إظهار" />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          
    </div>
  )
}

export default Categories