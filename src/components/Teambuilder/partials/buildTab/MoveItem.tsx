import React, { MutableRefObject, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getTypeData } from '../../../../utils'
import { Type } from '../../../../scripts/definitions/type'
import { Move } from '../../../../scripts/definitions/move'
import { usePopper } from 'react-popper'
import MoveTooltip from './MoveTooltip'

type MoveItemProps = {
  move: Move
  isSmall?: boolean
}

export default function MoveItem({ move, isSmall }: MoveItemProps) {
  const id = `${move.id} - ${move.name}`
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false)

  console.log(move)

  return (
    <>
      <Container
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        id={id}
        type={move.type}
        isSmall={isSmall}
      >
        <img src={getTypeData(move.type).symbol} />
        <p>{move.name}</p>
      </Container>
      {showTooltip && <MoveTooltip move={move} />}
    </>
  )
}

const Container = styled.div<{ type: Type; isSmall?: boolean }>`
  display: flex !important;
  width: ${({ isSmall }) => (isSmall ? '160px' : ' 222px')};
  font-size: ${({ isSmall }) => (isSmall ? '0.7rem' : '1rem')}
  align-items: center;
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: ${({ isSmall }) => (isSmall ? '5px' : '5px 10px')};
  gap: ${({ isSmall }) => (isSmall ? '10px' : '5px')};
  

  > p {
    line-height: ${({ isSmall }) => (isSmall ? '1.6rem' : '3rem')};
  }

  > img {
    padding: 1px;
    width: ${({ isSmall }) => (isSmall ? '15px' : '40px')};
    height: ${({ isSmall }) => (isSmall ? '15px' : '40px')};
    border-radius: 50%;
    border: 2px solid ${({ type }) => getTypeData(type).color};
  }
`
