import React from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

const Cities = ({data}) => {
  return (
    <div>
          <h3>Cities </h3>
          <table>
              <thead>
                  <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>Actions</td>
                  </tr>
              </thead>
              <tbody>
                  { data.map(cat => (
                      <tr>
                          <td>{ cat.id }</td>
                          <td>{ cat.name }</td>
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

export default Cities