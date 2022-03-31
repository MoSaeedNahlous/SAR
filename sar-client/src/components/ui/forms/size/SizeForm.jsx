import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_SIZE_RESET } from '../../../../redux/constants/sizesConstants'

const SizeForm = () => {

  
  const dispatch = useDispatch()
    

  const categoriesSt = useSelector(state => state.getCategories)
  const { categories, loading: catLoading, error: catError } = categoriesSt
  
  const subCategoriesSt = useSelector(state => state.getSubCategories)
  const { subCategories,loading:subCatLoading,error:subCatError } = subCategoriesSt

  // const currentSize = useSelector(state => state.setCurrentSize)
  // const { currentSize: current } = currentSize

  // const addSizeSt = useSelector(state => state.addSize)
  // const { loading: addingLoading, success, error: addingError } = addSizeSt
  
  // const updateSizeSt = useSelector((state) => state.updateSize);
  // const { success:updateSuccess, error:updateError, loading:updateLoading } = updateSizeSt;


  const [name, setName] = useState('')

  // useEffect(() => {
  //   if (current && current.catName) {
  //     setName(current.catName)
  //   }
  // }, [current])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(addNewCategory(name))
    document.getElementById('addSizeForm').reset()
    dispatch({ type: SET_CURRENT_SIZE_RESET })
    setName('')
  }
  
  const onClickHandler = (id,name) => {
    // dispatch(updateCategory(id,name))
    document.getElementById('addSizeForm').reset()
    dispatch({ type: SET_CURRENT_SIZE_RESET })
    
  }
  return (
      <form className='text-center mt-5' dir='rtl' onSubmit={submitHandler} id='addSizeForm'>
        <h2>القياس</h2>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-filled-label">الصنف الرئيسي</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            { categories.map((cat) => (
              <MenuItem key={cat.catID }value={cat.catID}>{cat.catName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-filled-label">الصنف الفرعي</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            { subCategories.map((subCat) => (
              <MenuItem  key={subCat.subCatID} value={subCat.subCatID}>{subCat.subCatName}</MenuItem>
            ))}
          </Select>
        </FormControl>
            <br />
            <TextField label="اسم القياس" variant="standard" sx={{minWidth: '400px'}}/>
        <br />
        <br />
            <button className='btn btn-outline-primary mx-1' type='button'>تعديل</button>
            <button className='btn btn-primary mx-1' type="submit">إضافة</button>
            
      </form>
  )
}

export default SizeForm