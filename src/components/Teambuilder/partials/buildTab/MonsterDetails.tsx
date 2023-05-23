import React from 'react'
import styled from 'styled-components'
import { Monster } from '../../../../scripts/definitions/monster'

import PortraitBG from '../../../../assets/sprites/ui/portraitBG.png'
import StatItem from './StatItem'
import MoveItem from './MoveItem'

type MonsterDetailsProps = {
  monster: Monster
}

export default function MonsterDetails({ monster }: MonsterDetailsProps) {
  return (
    <Container>
      <PortaitContainer>
        <img src={monster.sprites.portraitPath}></img>
      </PortaitContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{monster.name}</h2>
        <div style={{ display: 'flex' }}>
          {<span>{monster.type1}</span>}
          {monster.type2 && <span>&nbsp;{monster.type2}</span>}
        </div>
      </div>

      <p>{monster.desc}</p>
      <h2>Ability: Abilities aren't in the game yet lmao</h2>
      <h2>Stats:</h2>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-15px', gap: '3px' }}>
        {Object.entries(monster.stats).map((stat) => (
          <StatItem key={stat[0]} name={stat[0]} stat={stat[1]} />
        ))}
      </div>

      <h2>Moves:</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {monster.getMoves().map((move, idx) => {
          return <MoveItem key={`${move.name}-${idx}-desc`} move={move} />
        })}
      </div>

      {/* <Column>
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
        </Column> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 20px;

  > div {
    > h2 {
      font-size: 1.3rem;
    }
  }
`
const PortaitContainer = styled.div`
  border: 10px solid darkgray;
  border-radius: 30px;
  overflow: hidden;
  background-image: url(${PortraitBG});
  width: 300px;
  height: 300px;
  $bg-width: 50px;
  $bg-height: 50px;

  @keyframes infiniteScrollBg {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: -808px -808px;
    }
  }

  animation: infiniteScrollBg 50s linear infinite;

  > img {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
`
