import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { CustomButton } from './GridControls'
import { Move } from '../../../../scripts/definitions/move'
import BattleDataContext from '../../../BattleDataContext'
import { Targeting } from '../../../../scripts/definitions/enums'
import { MoveTargeting, TurnActionTarget } from '../../../../scripts/definitions/turnAction'
import { getTargetingGridOrMonster, getTargetingPolarity } from '../../../../utils'
import { render } from 'react-dom'
import BattleScene from '../../../../scripts/scenes/battleScene'

type TargetingControlsProps = {
  onCancel: Function
  onTargetSelect: Function
  move: Move
}

export default function TargetingControls({ onCancel, onTargetSelect, move }: TargetingControlsProps) {
  const battleScene = useContext(BattleDataContext)
  const [selectedTargets, setSelectedTargets] = React.useState<TurnActionTarget>()
  const gridStatus = battleScene?.getGrid()
  const moveTargetingPolarity = getTargetingPolarity(move.targeting)
  const gridToRender = moveTargetingPolarity === 'ally' ? gridStatus?.playerGrid : gridStatus?.enemyGrid.reverse()

  function handleTargeting(target) {
    switch (move.targeting.targeting) {
      case Targeting.SINGLE_ENEMY:
        setSelectedTargets(target)
        break
    }
  }

  useEffect(() => {
    if (selectedTargets) onTargetSelect(selectedTargets)
  }, [selectedTargets])

  function renderTargetingMessage() {
    const { targeting } = move
    const polarity = getTargetingPolarity(targeting)
    const gridOrMonster = getTargetingGridOrMonster(targeting)

    let string = 'Select '
    if (
      targeting.targeting === Targeting.SINGLE_ENEMY ||
      targeting.targeting === Targeting.SINGLE_GRID_SELF ||
      targeting.targeting === Targeting.SINGLE_GRID_ENEMY ||
      targeting.targeting === Targeting.SINGLE_TEAMMATE
    ) {
      string += 'one '
    }
    if (
      targeting.targeting === Targeting.MULTIPLE_ENEMY ||
      targeting.targeting === Targeting.MULTIPLE_TEAMMATE ||
      targeting.targeting === Targeting.MULTIPLE_GRID_OTHER ||
      targeting.targeting === Targeting.MULTIPLE_GRID_SELF
    ) {
      string += targeting.qty
    }
    string += polarity + ' ' + gridOrMonster
    return string
  }

  return (
    <>
      <CustomButton onClick={() => onCancel()}>{'<-'}</CustomButton>
      <Explanation>
        <p>Select your move's target</p>
      </Explanation>
      <Grid>
        <p>{renderTargetingMessage()}</p>
        <div>
          {gridToRender?.map((column, colIdx) => {
            const columnToMap = moveTargetingPolarity === 'enemy' ? column.reverse() : column
            return columnToMap.map((rowItem, rowIdx) => {
              const monster = rowItem.getMonster()

              return (
                <GridSpotRepresentation
                  onClick={() => (monster ? handleTargeting(monster) : null)}
                  hasMonster={!!monster}
                  rowIdx={rowIdx + 1}
                  colIdx={colIdx + 1}
                >
                  <img src={rowItem.getMonster()?.getMiniSprite()}></img>
                </GridSpotRepresentation>
              )
            })
          })}
        </div>
      </Grid>
    </>
  )
}

const Explanation = styled.div`
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid lightgrey;
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid lightgrey;

  grid-column: 2;

  > p {
    margin-top: 0;
  }

  > div {
    display: grid;
    grid-template-rows: 95px 95px;
    grid-template-columns: 95px 95px 95px;
    grid-gap: 5px;
  }
`

const GridSpotRepresentation = styled.div<{ hasMonster: boolean; rowIdx: number; colIdx: number }>`
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: gray;
  padding: 10px;
  border: 2px solid lightgrey;
  border-radius: 50%;
  grid-row: ${({ rowIdx }) => rowIdx};
  grid-col: ${({ colIdx }) => colIdx};

  ${({ hasMonster }) => {
    return hasMonster ? ':hover { border: 2px solid white; background-color: lightgray; }' : ' '
  }}
`
