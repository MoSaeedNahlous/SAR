import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import { ADD_SUBCATEGORY_RESET, UPDATE_SUBCATEGORY_RESET } from '../../../../redux/constants/subCategoriesConstants'


const SubCategoryForm = () => {

  const dispatch = useDispatch()
  
  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

    
  const currentSubCategory = useSelector(state => state.setCurrentSubCategory)
  const { currentSubCategory: current } = currentSubCategory

  const addSubCategorySt = useSelector(state => state.addSubCategory)
  const { loading: addingLoading, success, error: addingError } = addSubCategorySt
  
  const updateSubCategorySt = useSelector((state) => state.updateSubCategory);
  const { success:updateSuccess, error:updateError, loading:updateLoading } = updateSubCategorySt;

  // const addCategorySt = useSelector(state => state.addCategory)
  // const { loading:addingLoading , error:addingError } = addCategorySt



  const [name, setName] = useState('')
  const [catId, setCatId] = useState('')
  
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  

  useEffect(() => {
    if (current && current.subCatName) {
      setName(current.subCatName)
      setCatId(current.catID)
    }
  }, [current])
  
 

  const submitHandler = (e) => {
    e.preventDefault()
    
  }
  

  
  
  return (
    <form className='text-center' onSubmit={ submitHandler }>
      { success && <Alert onClose={() => {dispatch({type:ADD_SUBCATEGORY_RESET})}}>تمت الإضافة بنجاح</Alert> }
      { addingError && <Alert variant='error' onClose={ () => { dispatch({ type: ADD_SUBCATEGORY_RESET }) } }>{ addingError }</Alert> }
      { updateSuccess && <Alert onClose={() => {dispatch({type:UPDATE_SUBCATEGORY_RESET})}}>تم التعديل بنجاح</Alert> }
      { updateError && <Alert variant='error' onClose={ () => { dispatch({ type: UPDATE_SUBCATEGORY_RESET }) } }>{ updateError }</Alert>}
      <h2 className='text-center mb-3'>الأصناف الفرعية</h2>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
        <Select
          sx={{width: '100%'}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={ catId }
          onChange={(e)=>setCatId(e.target.value)}
        >
          {loading ?
    <CircularProgress />
  : categoriesList.map((cat) => (
            <MenuItem
              key={cat.catID}
              value={ cat.catID }>{ cat.catName }
            </MenuItem>
          ))}
        </Select>
        <TextField sx={ { width: '100%' } }
          label="اسم الصنف الفرعي"
          onChange={
          (e) => setName(e.target.value)
        }
        variant='standard'
          value={ name }
        />
      </FormControl>

      <br />
          <button type='button' className='btn btn-outline-primary mx-1'>تعديل</button>
          <button type='submit' className='btn btn-primary mx-1'>إضافة</button>
         
    </form>
  )
}

export default SubCategoryForm