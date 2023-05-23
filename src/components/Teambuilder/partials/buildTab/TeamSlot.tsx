import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import { BiBlock } from 'react-icons/bi'

type TeamSlotProps = {
  listkey: string
  monster: Monster | null
  //TODO: add item
  idx: number
  selected: boolean
  setSelected: Function
  canMoveLeft: boolean
  canMoveRight: boolean
  onMoveRight: Function
  onMoveLeft: Function
}

export default function TeamSlot({
  listkey,
  monster,
  idx,
  selected,
  setSelected,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight
}: TeamSlotProps) {
  return (
    <Container key={listkey}>
      {idx > 0 && (
        <button disabled={!canMoveLeft} onClick={() => onMoveLeft()}>
          {'<'}
        </button>
      )}
      <MiniSpriteContainer selected={selected} onClick={() => setSelected(idx)}>
        {monster ? <img src={monster.sprites.miniSpritePath} /> : <BiBlock />}
      </MiniSpriteContainer>
      {idx < 5 && (
        <button disabled={!canMoveRight} onClick={() => onMoveRight()}>
          {'>'}
        </button>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 5px;

  > * {
    cursor: pointer;
  }
`

const MiniSpriteContainer = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 50px;
  width: 50px;
  border: 3px solid darkgray;
  background: ${({ selected }) => (selected ? 'lightgray' : 'gray')};
  border-radius: 5px;
  ${({ selected }) => (selected ? `box-shadow: lightblue 0 0 25px;` : '')}

  > img {
    width: 50px;
    height: 50px;
  }
`
