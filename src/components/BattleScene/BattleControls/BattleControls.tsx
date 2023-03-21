import React from 'react'
import styled from 'styled-components'
import CustomEventDispatcher, { CustomEvents } from '../../../scripts/behaviors/CustomEventDispatcher'
import { Monster } from '../../../scripts/definitions/monster'
import { Move } from '../../../scripts/definitions/move'
import { TurnActionMove } from '../../../scripts/definitions/turnAction'
import APMeter from '../APMeter'
import GridControls from './partials/GridControls'
import MoveButton from './partials/MoveButton'

export default function BattleControls({ monster }: { monster: Monster }) {
  const { move1, move2, move3, move4 } = monster

  function onMoveSelect(move: Move | undefined) {
    if (move)
      CustomEventDispatcher.getInstance().emit(
        CustomEvents.QUEUE_TURN_ACTION,
        new TurnActionMove(move, monster, monster)
      )
  }

  return (
    <Container>
      <APMeter />
      <GridControls />
      <MoveGrid>
        <MoveButton onClick={() => onMoveSelect(move1)} move={move1} />
        <MoveButton onClick={() => onMoveSelect(move2)} move={move2} />
        <MoveButton onClick={() => onMoveSelect(move3)} move={move3} />
        <MoveButton onClick={() => onMoveSelect(move4)} move={move4} />
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
