import React from 'react'
import styled from 'styled-components'
import { Vector2 } from 'three'
import { Monster } from '../scripts/definitions/monster'

export interface MonsterPlateProps {
  monster: Monster
  position: Vector2
}

export default function MonsterPlate({ monster, position }: MonsterPlateProps) {
  return (
    <div>
      <h1>{monster.name}</h1>
      <h2>{monster.currentHP}</h2>
    </div>
  )
}

const PlateContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
`
