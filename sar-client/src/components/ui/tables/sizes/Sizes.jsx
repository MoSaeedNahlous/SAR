import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { cats } from '../../forms/categories/dummy-cats'

const Sizes = ({data}) => {
  return (
     <div>
          <h2>Sizes</h2>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الفرعي</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { cats.map((cat) => (
            <MenuItem value={cat.name}>{cat.name}</MenuItem>
          ))}
        </Select>
          </FormControl>
          <br />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">الصنف الفرعي</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          { cats.map((cat) => (
            <MenuItem value={cat.name}>{cat.name}</MenuItem>
          ))}
        </Select>
          </FormControl>
          <br />
          <table>
              <thead>
                  <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>Actions</td>
                  </tr>
              </thead>
              <tbody>
                  { data.map(target => (
                      <tr>
                          <td>{ target.id }</td>
                          <td>{ target.name }</td>
                          <td><Button>delete</Button> <Button>edit</Button>
                              <FormControlLabel control={
                  <Checkbox
                      name="Show"
                  />
              } label="Show" />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}

export default Sizes