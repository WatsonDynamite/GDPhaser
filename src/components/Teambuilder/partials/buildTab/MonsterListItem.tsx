import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import { Type } from '../../../../scripts/definitions/type'
import { getTypeColor } from '../../../../utils'

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
      <td>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
              return (
                <MoveItem key={`${move.name}-${idx}`} type={move.type}>
                  <div />
                  {move.name}
                </MoveItem>
              )
            })}
          </MoveListContainer>
        </div>
      </td>
      <td>
        <StatContainer>
          <div>CON</div>
          <div>{monster.stats.con.value}</div>
        </StatContainer>
      </td>
      <td>
        <StatContainer>
          <div>STR</div>
          <div>{monster.stats.str.value}</div>
        </StatContainer>
      </td>
      <td>
        <StatContainer>
          <div>ARM</div>
          <div>{monster.stats.arm.value}</div>
        </StatContainer>
      </td>
      <td>
        <StatContainer>
          <div>WIS</div>
          <div>{monster.stats.wis.value}</div>
        </StatContainer>
      </td>
      <td>
        <StatContainer>
          <div>INT</div>
          <div>{monster.stats.dex.value}</div>
        </StatContainer>
      </td>
      <td>
        <StatContainer>
          <div>DEX</div>
          <div>{monster.stats.dex.value}</div>
        </StatContainer>
      </td>
    </Container>
  )
}

const Container = styled.tr<{ isSelected: boolean }>`
  width: inherit;
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  cursor: pointer;
  ${({ isSelected }) => (isSelected ? 'background-color: gray;' : '')}

  > td {
    width: min-content;
  }
`

const MoveListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const MoveItem = styled.div<{ type: Type }>`
  min-width: 150px;
  display: flex;
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 10px;
  gap: 5px;

  > div {
    padding: 10px;
    border-radius: 50%;
    background-color: ${({ type }) => getTypeColor(type)};
  }
`

const MonsterIdentityContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  background-color: lightgray;
  border: 2px solid gray;
  border-radius: 10px;
  overflow: hidden;
  width: min-content;

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
