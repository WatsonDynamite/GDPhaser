import React from 'react'
import styled from 'styled-components'
import { Move } from '../../../../scripts/definitions/move'

export default function MoveButton({ move }: { move: Move | undefined }) {
  if (!move) return null

  const { name, type, APCost, power } = move
  return (
    <Button>
      <ButtonGrid>
        <div>
          {name} - {type}
        </div>
        <div>
          cost: {APCost} &nbsp; Power: {power}
        </div>
      </ButtonGrid>
    </Button>
  )
}

export const Button = styled.button`
  width: 150px;
  height: 70px;
  background-color: grey;
  border-radius: 10px;
  border: 2px solid lightgrey;

  :hover {
    background-color: darkgrey;
  }
`

export const ButtonGrid = styled.div``
