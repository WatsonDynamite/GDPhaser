import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'
import { cloneMonster } from '../../../../scripts/data/monsterList'
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'

type NicknameInputProps = {
  monster: Monster
  id: string
  labelText: string
  onSave: Function
  placeholder?: string
}

export default function NicknameInput({ monster, id, labelText, placeholder, onSave }: NicknameInputProps) {
  const [nicknameValue, setNicknameValue] = React.useState<string>(monster.getNickname() ?? '')
  const [isEditing, setIsEditing] = React.useState<boolean>(false)

  function onSaveHandler() {
    console.log(onSaveHandler)
    const newMonster = cloneMonster(monster)
    newMonster.setNickname(nicknameValue)
    setIsEditing(false)
    onSave(newMonster)
  }

  return (
    <Container>
      <label htmlFor={id}>{labelText}</label>

      <Row width={'100px'}>
        {isEditing ? (
          <>
            <input
              onKeyDown={(e) => (e.key === 'Enter' ? onSaveHandler() : null)}
              onChange={(e) => setNicknameValue(e.currentTarget.value)}
              id={id}
              placeholder={placeholder}
            ></input>
            <AiOutlineCheck onClick={() => onSaveHandler()} style={{ cursor: 'pointer' }} />
          </>
        ) : (
          <>
            <p>{!monster.getNickname() || monster.getNickname() === '' ? monster.name : monster.getNickname()}</p>
            <AiOutlineEdit onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }} />
          </>
        )}
      </Row>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 75%;
`

const Row = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: ${({ width }) => width ?? 'auto'};
  height: 21px;
  font-size: 1.1em;

  > p {
    margin: 0 !important;
  }

  > input {
    width: 90%;
  }
`
