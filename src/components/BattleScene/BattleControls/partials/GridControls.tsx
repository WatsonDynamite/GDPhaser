import React from 'react'
import styled from 'styled-components'

export default function GridControls() {
  return (
    <Grid>
      <div />
      <CustomButton />
      <div />
      <CustomButton />
      <CustomButton />
      <CustomButton />
      <div />
      <CustomButton />
    </Grid>
  )
}

export const Grid = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  grid-gap: 3px;
`

export const CustomButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 10px;
  border: 2px solid lightgrey;

  :hover {
    background-color: darkgrey;
  }
`
