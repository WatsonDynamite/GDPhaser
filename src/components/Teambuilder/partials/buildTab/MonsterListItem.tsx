import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import { Type } from '../../../../scripts/definitions/type'
import { getTypeData } from '../../../../utils'
import MoveItem from './MoveItem'

type MonsterListItemProps = {
  listkey: string
  monster: Monster
  onClick: Function
  isSelected: boolean
}

export default function MonsterListItem({ listkey, monster, onClick, isSelected }: MonsterListItemProps) {
  return (
    <Container
      key={listkey}
      onClick={() => {
        if (!isSelected) onClick()
      }}
      isSelected={isSelected}
    >
      <div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '100%', width: '416px' }}>
          <MonsterIdentityContainer>
            <img src={monster.sprites.miniSpritePath} />
            <p>{monster.name}</p>
            <div>
              <div>{monster.type1}</div>
              {monster.type2 && <div>{monster.type2}</div>}
            </div>
          </MonsterIdentityContainer>
          <MoveListContainer>
            {monster.getMoves().map((move, idx) => {
              return <MoveItem key={`${move.name}-${idx}`} move={move} />
            })}
          </MoveListContainer>
        </div>
      </div>
      <Stats>
        <StatContainer>
          <div>CON</div>
          <div>{monster.stats.con.value}</div>
        </StatContainer>
        <StatContainer>
          <div>STR</div>
          <div>{monster.stats.str.value}</div>
        </StatContainer>
        <StatContainer>
          <div>ARM</div>
          <div>{monster.stats.arm.value}</div>
        </StatContainer>
        <StatContainer>
          <div>WIS</div>
          <div>{monster.stats.wis.value}</div>
        </StatContainer>
        <StatContainer>
          <div>INS</div>
          <div>{monster.stats.ins.value}</div>
        </StatContainer>
        <StatContainer>
          <div>DEX</div>
          <div>{monster.stats.dex.value}</div>
        </StatContainer>
      </Stats>
    </Container>
  )
}

const Container = styled.div<{ isSelected: boolean }>`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  ${({ isSelected }) => (isSelected ? 'background-color: gray;' : '')}
  > div {
    width: min-content;
  }
`

const Stats = styled.div`
  display: flex;
  gap: 20px;
`

const MoveListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 175px;
`

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const MonsterIdentityContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  background-color: lightgray;
  border-radius: 10px;
  overflow: hidden;
  width: 210px;

  > p {
    text-align: center;
  }

  > div {
    grid-row: 1 / span 2;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 10px;
  }
`
