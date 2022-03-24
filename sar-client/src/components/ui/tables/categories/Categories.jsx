import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const Categories = ({data}) => {
  return (
      <div>
          <h3>Categories </h3>
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

export default Categories