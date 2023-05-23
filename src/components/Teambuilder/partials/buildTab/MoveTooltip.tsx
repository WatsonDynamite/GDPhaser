import React from 'react'
import { Move } from '../../../../scripts/definitions/move'
import styled from 'styled-components'
import { useMousePosition } from '../../utils'

import bane from '../../../../assets/sprites/ui/bane.png'
import boon from '../../../../assets/sprites/ui/boon.png'
import magical from '../../../../assets/sprites/ui/magical.png'
import physical from '../../../../assets/sprites/ui/boon.png'
import { getTypeData } from '../../../../utils'
import { Category } from '../../../../scripts/definitions/enums'

import cost1 from '../../../../assets/sprites/ui/cost1.png'
import cost2 from '../../../../assets/sprites/ui/cost2.png'
import cost3 from '../../../../assets/sprites/ui/cost3.png'
import cost4 from '../../../../assets/sprites/ui/cost4.png'
import cost5 from '../../../../assets/sprites/ui/cost5.png'
import cost6 from '../../../../assets/sprites/ui/cost6.png'

import priom3 from '../../../../assets/sprites/ui/prio-3.png'
import priom2 from '../../../../assets/sprites/ui/prio-2.png'
import priom1 from '../../../../assets/sprites/ui/prio-1.png'
import prioB from '../../../../assets/sprites/ui/prioB.png'
import prio1 from '../../../../assets/sprites/ui/prio1.png'
import prio2 from '../../../../assets/sprites/ui/prio2.png'
import prio3 from '../../../../assets/sprites/ui/prio3.png'

type MoveTooltipProps = {
  move: Move
}

export default function MoveTooltip(props: MoveTooltipProps) {
  const {
    move: { APCost, category, desc, name, power, priority, type, targeting }
  } = props
  const { x, y } = useMousePosition()

  const costs = [cost1, cost2, cost3, cost4, cost5, cost6]

  function getCategorySprite(): string {
    switch (category) {
      case Category.PHYSICAL:
        return physical
      case Category.MAGICAL:
        return magical
      case Category.BOON:
        return boon
      case Category.BANE:
        return bane
      default:
        return ''
    }
  }

  function getPrioritySprite(): string {
    switch (priority) {
      case 0.25:
        return priom3
      case 0.33:
        return priom2
      case 0.5:
        return priom1
      case 1:
        return prioB
      case 2:
        return prio1
      case 3:
        return prio2
      case 4:
        return prio3
      default:
        return ''
    }
  }

  return (
    <>
      {x && y && (
        <Container x={x} y={y}>
          <MoveName>{name}</MoveName>
          <TypeAndCategoryData>
            <img src={getTypeData(type).symbol} />
            <img src={getCategorySprite()} />
          </TypeAndCategoryData>
          <Description>{desc}</Description>
          <Cost>
            <p>Cost:</p>
            <img src={costs[APCost + 1]} />
          </Cost>
          <Power>
            <p>Pow:&nbsp;</p>
            <p>{power}</p>
          </Power>
          <Priority>
            <p>Prio:&nbsp;</p>
            <img src={getPrioritySprite()} />
          </Priority>
        </Container>
      )}
    </>
  )
}

const Container = styled.div.attrs<{ x: any; y: any }>(({ x, y }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`
  }
}))<{ x: any; y: any }>`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: -60px;
  margin-left: -60px;
  background-color: darkgray;
  border: 3px solid gray;
  border-radius: 10px;
  padding: 8px;
  color: white;
  visibility: colapse;

  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-gap: 5px;
  grid-template-columns: auto auto auto;
`

const Description = styled.div`
  grid-row: 2;
  grid-column: 1 / span 3;
  font-size: 0.8rem;
  margin-bottom: 4px;
`

const TypeAndCategoryData = styled.div`
  display: flex;
  gap: 3px;
  grid-row: 1;
  grid-column: 3;
  margin-left: 15px;

  > img {
    width: 20px;
    height: 20px;
  }
`

const MoveName = styled.p`
  grid-row: 1;
  grid-col: 1;
  line-height: 1.6rem;
  width: 150px;
`

const Cost = styled.div`
  display: flex;
  gap: 3px;
  grid-row: 3;
  grid-column: 1;
  font-size: 0.8rem;
  line-height: 20px;

  > p {
    font-size: 0, 7rem;
  }

  > img {
    height: 16px;
    width: auto;
  }
`

const Priority = styled.div`
  display: flex;
  grid-row: 3;
  grid-column: 3;
  font-size: 14px;
  line-height: 20px;

  > img {
    height: 16px;
    width: auto;
  }
`

const Power = styled.div`
  display: flex;
  grid-row: 1;
  grid-column: 2;
  font-size: 14px;
  line-height: 27px;

  > img {
    height: 16px;
    width: auto;
  }
`
