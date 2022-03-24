import React from 'react'
import { useState } from 'react'
import { TextField,Box, Button, FormControlLabel, Checkbox} from '@mui/material'
import { AccountCircle,Key} from '@mui/icons-material'

const EmpLoginForm = () => {
    const [formInfo, setFormInfo] = useState({ username: "", password: "",rememberMe:false })
    const onChangeHandler = (e) => {
        setFormInfo({...formInfo,[e.target.name]:e.target.value})
    }
    const onCheckHandler = (e) => {
        setFormInfo({ ...formInfo, rememberMe: e.target.checked})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        // Login http request function go here
    }

  return (
      <form onSubmit={ submitHandler }>
          <h1>تسجيل دخول</h1>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="username" label="اسم المستخدم" value={formInfo.username} variant="standard"name='username' onChange={onChangeHandler} />
          </Box>
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="password" label="كلمة السر"  value={formInfo.passowrd}variant="standard" name='password' type={'password'} onChange={onChangeHandler} />
          </Box>

          <div>
              
              <Button variant="contained" type='submit'>Login</Button>
              <FormControlLabel control={
                  <Checkbox
                      name="rememberMe"
                      checked={ formInfo.rememberMe }
                      onClick={ onCheckHandler }
                  />
              } label="تذكرني؟" />

          </div>
    </form>
  )
}

export default EmpLoginForm