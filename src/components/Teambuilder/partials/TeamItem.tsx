import styled from 'styled-components'
import { Team } from '../../../scripts/definitions/team'
import React from 'react'
import { Monster } from '../../../scripts/definitions/monster'
import { AiFillEdit, AiFillCopy, AiOutlineExport } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'

type TeamItemProps = {
  team: Team
  onClickEdit: Function
  onClickDuplicate: Function
  onClickExport: Function
  onClickDelete: Function
}

export default function TeamItem({ team, onClickDelete, onClickDuplicate, onClickEdit, onClickExport }: TeamItemProps) {
  return (
    <RoundedContainer>
      <h2>{team.name}</h2>
      <MonContainer>
        {team.monsters.map((mon) => (
          <MonsterContainer key={`${team.name}-${mon.name}`} monster={mon} />
        ))}
      </MonContainer>
      <ButtonContainer>
        <CustomButton>
          <AiFillEdit height={40} width={40} />
        </CustomButton>
        <CustomButton>
          <AiFillCopy height={40} width={40} />
        </CustomButton>
        <CustomButton onClick={() => onClickExport()}>
          <AiOutlineExport height={40} width={40} />
        </CustomButton>
        <CustomButton onClick={() => onClickDelete()}>
          <BsFillTrashFill height={40} width={40} />
        </CustomButton>
      </ButtonContainer>
    </RoundedContainer>
  )
}

function MonsterContainer({ monster }: { monster: Monster }) {
  return (
    <RoundedContainer style={{ flexDirection: 'column', padding: '5px', margin: '0 2px' }}>
      <img width={50} height={50} src={monster.sprites.miniSpritePath} />
    </RoundedContainer>
  )
}

const MonContainer = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: space-between;
`

const CustomButton = styled.button`
  background-color: lightgray;
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;

  > svg {
    width: 30px;
    height: 30px;
  }
`

const ButtonContainer = styled(MonContainer)`
  gap: 5px;
`

const RoundedContainer = styled.div`
  width: 90%;
  background-color: lightgray;
  border: 2px solid darkgray;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
