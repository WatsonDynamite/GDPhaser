import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import NicknameInput from './NicknameInput'
import { getTypeData } from '../../../../utils'
import MoveItem from './MoveItem'
import StatItem from './StatItem'

type NicknameFormProps = {
  monster: Monster
  onSaveNickname: Function
}

export default function NicknameForm({ monster, onSaveNickname }: NicknameFormProps) {
  function saveNicknameHandler(monsterCpy) {
    onSaveNickname(monsterCpy)
  }

  return (
    <Container>
      <Column>
        <img width={80} height={80} src={monster.getMiniSprite()} />
        <div>
          <NicknameInput
            monster={monster}
            id={`MonsterNickname-${monster.name}`}
            labelText={'Nickname:'}
            placeholder={monster.name}
            onSave={saveNicknameHandler}
          />
        </div>
      </Column>
      {/* 

        <Column>
        <label>Type</label>
        <Row>
          {<img width={30} src={getTypeData(monster.type1).symbol} />}
          {monster.type2 && <img width={30} src={getTypeData(monster.type2).symbol} />}
        </Row>
      </Column>
      <Column>
        {monster.getMoves().map((move) => (
          <MoveItem isSmall move={move} key={move.id} />
        ))}
      </Column>
      <Column style={{ width: '150px' }}>
        {Object.entries(monster.stats).map((stat) => (
          <StatItem key={stat[0]} name={stat[0]} stat={stat[1]} />
        ))}
      </Column>
      */}
    </Container>
  )
}

/**
 * 
 * <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width={75} height={75} src={selectedMonster.getMiniSprite()}></img>
            
          </div>
 */
const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  padding: 10px;
  border: 2px solid darkgray;
  border-radius: 10px;
  gap: 20px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 200px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
