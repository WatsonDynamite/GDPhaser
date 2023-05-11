import styled from 'styled-components'
import { Team } from '../../../scripts/definitions/team'
import React from 'react'
import { Monster } from '../../../scripts/definitions/monster'

type TeamItemProps = {
  team: Team
}

export default function TeamItem({ team }: TeamItemProps) {
  return (
    <RoundedContainer>
      <h2>{team.name}</h2>
      <MonContainer>
        {team.monsters.map((mon) => (
          <MonsterContainer key={`${team.name}-${mon.name}`} monster={mon} />
        ))}
      </MonContainer>
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
