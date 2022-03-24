import { Button, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const Targets = ({data}) => {
  return (
      <div>
          <h2>Targets</h2>
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

export default Targets