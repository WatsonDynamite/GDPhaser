import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../scripts/definitions/monster'
import APMeter from '../APMeter'
import GridControls from './partials/GridControls'
import MoveButton from './partials/MoveButton'

export default function BattleControls({ monster }: { monster: Monster }) {
  const { move1, move2, move3, move4 } = monster

  return (
    <Container>
      <APMeter />
      <GridControls />
      <MoveGrid>
        <MoveButton move={move1} />
        <MoveButton move={move2} />
        <MoveButton move={move3} />
        <MoveButton move={move4} />
      </MoveGrid>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: left;
  padding: 20px;
  display: grid;
  column-gap: 50px;
  row-gap: 25px;
`

const MoveGrid = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 50% 50%;
`
