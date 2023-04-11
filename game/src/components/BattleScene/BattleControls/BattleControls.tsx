import React, { useContext } from 'react'
import styled from 'styled-components'
import CustomEventDispatcher, { CustomEvents } from '../../../scripts/behaviors/CustomEventDispatcher'
import { Monster } from '../../../scripts/definitions/monster'
import { Move } from '../../../scripts/definitions/move'
import { TurnActionMoveDTO, TurnActionTarget } from '../../../scripts/definitions/turnAction'
import APMeter from '../APMeter'
import GridControls, { CustomButton } from './partials/GridControls'
import MoveButton from './partials/MoveButton'
import TargetingControls from './partials/TargetingControls'
import { GridSpot } from '../../../gameObjects/gridSpot'
import BattleDataContext from '../../BattleDataContext'

type BattleControlsProps = {
  currentMonster: Monster
  moveToNextMonster: Function
}

export default function BattleControls({ currentMonster, moveToNextMonster }: BattleControlsProps) {
  const battleScene = useContext(BattleDataContext)
  const { move1, move2, move3, move4 } = currentMonster
  const [mode, setMode] = React.useState<'move' | 'target'>('move')
  const [move, setMove] = React.useState<Move>()

  function onMoveSelect(move: Move | undefined) {
    if (move) {
      setMove(move)
      setMode('target')
    }
  }

  function onCancelTargeting() {
    setMode('move')
    setMove(undefined)
  }

  function onTargetSelect(target: TurnActionTarget) {
    QueueMove(move!, target)
    onCancelTargeting()
  }

  function QueueMove(move: Move, target: TurnActionTarget) {
    const id = Array.isArray(target) ? target.map((el) => el.battleId) : target.getBattleId()!

    const action = new TurnActionMoveDTO(
      `${battleScene!.socketClient.id}-${currentMonster.name}`,
      currentMonster.stats.dex.getTrueValue() * move.priority,
      move.id,
      id
    )
    battleScene!.addTurnAction(action)
    moveToNextMonster()
  }

  return (
    <Container>
      {mode === 'move' && (
        <>
          <APMeter />
          <GridControls />
          <MoveGrid>
            <MoveButton onClick={() => onMoveSelect(move1)} move={move1} />
            <MoveButton onClick={() => onMoveSelect(move2)} move={move2} />
            <MoveButton onClick={() => onMoveSelect(move3)} move={move3} />
            <MoveButton onClick={() => onMoveSelect(move4)} move={move4} />
          </MoveGrid>
        </>
      )}
      {mode === 'target' && move && (
        <TargetingControls move={move} onTargetSelect={onTargetSelect} onCancel={onCancelTargeting} />
      )}
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
