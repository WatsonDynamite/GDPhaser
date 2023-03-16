import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Vector2 } from 'three'
import { Monster } from '../scripts/definitions/monster'
import { getScreenPositionFromWorldSpace } from '../utils'

export interface MonsterPlateProps {
  monster: Monster
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  canvas: HTMLCanvasElement
}

export default function MonsterPlate({ monster, camera, canvas }: MonsterPlateProps) {
  const [position, setPosition] = React.useState<Vector2>(
    getScreenPositionFromWorldSpace(monster.getGameObject().position, camera, canvas)
  )
  const { x, y } = position

  //console.log(canvas.width)
  //console.log(canvas.height)

  function recalculatePosition() {
    setPosition(getScreenPositionFromWorldSpace(monster.getGameObject().position, camera, canvas))
  }

  //window.addEventListener('resize', recalculatePosition)

  useEffect(() => {
    recalculatePosition()
  }, [monster, camera, canvas, window])

  return (
    <PlateContainer key={monster.name} x={x} y={y}>
      <h1>{monster.name}</h1>
      <h2>{monster.currentHP}</h2>
    </PlateContainer>
  )
}

const PlateContainer = styled.div<{ x: number; y: number }>`
  width: 300px;
  height: 100px;
  position: absolute !important;
  left: ${({ x }) => x}vw;
  top: ${({ y }) => y}vh;
`
