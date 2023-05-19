import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import NicknameInput from './NicknameInput'

type NicknameFormProps = {
  monster: Monster
  onSaveNickname: Function
}

export default function NicknameForm({ monster, onSaveNickname }: NicknameFormProps) {
  function saveNicknameHandler(monsterCpy) {
    console.log(monsterCpy)
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
      <Column>
        <Row></Row>
      </Column>
      <Column>
        <Row></Row>
      </Column>
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
  grid-template-columns: auto auto auto auto;
  padding: 10px;
  border: 2px solid darkgray;
  border-radius: 10px;
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
