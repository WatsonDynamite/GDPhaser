import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Vector2 } from 'three'
import { Monster } from '../../scripts/definitions/monster'
import { getScreenPositionFromWorldSpace } from '../../utils'
import MonsterHP from './MonsterHP'

export interface MonsterPlateProps {
  monster: Monster
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  canvas: HTMLCanvasElement
}

export default function MonsterPlate({ monster, camera, canvas }: MonsterPlateProps) {
  const [position, setPosition] = React.useState<Vector2>(
    getScreenPositionFromWorldSpace(monster.getGridSpot().spotModel.position, camera)
  )
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false)
  const {
    stats: { arm, dex, int, str, wis },
    type1,
    type2
  } = monster

  const { x, y } = position
  const vertModifier = monster.getGridSpot().getPlayer() === 2 ? 22 : 0

  function recalculatePosition() {
    setPosition(getScreenPositionFromWorldSpace(monster.getGridSpot().spotModel.position, camera))
  }

  useEffect(() => {
    recalculatePosition()
  }, [monster, camera, canvas, window])

  return (
    <PlateContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      key={monster.name}
      x={x}
      y={y - vertModifier}
    >
      <h1>{monster.getNickname() ?? monster.name}</h1>
      <MonsterHP currentHP={monster.currentHP} maxHP={monster.maxHP} />
      <Tooltip show={showTooltip}>
        <p>STR: {str.value}</p>
        <p>ARM: {arm.value}</p>
        <p>INT: {int.value}</p>
        <p>WIS: {wis.value}</p>
        <p>DEX: {dex.value}</p>
        <p>
          {type1}
          {type2 ? `/${type2}` : ''}
        </p>
      </Tooltip>
    </PlateContainer>
  )
}

const PlateContainer = styled.div<{ x: number; y: number }>`
  border-radius: 10px;
  background-color: lightgrey;
  border: 1px solid grey;
  padding: 5px 5px;
  width: 150px;
  position: absolute !important;
  left: ${({ x }) => x - 2}vw;
  top: ${({ y }) => y + 3}vh;

  > h1 {
    font-size: 1.5rem;
  }

  > * {
    margin: 0px !important;
  }
`

const Tooltip = styled.div<{ show: boolean }>`
  transition: max-height 0.4s;
  max-height: ${({ show }) => (show ? '300px' : '0')};
  overflow: hidden;
`
