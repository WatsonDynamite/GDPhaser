import styled from 'styled-components'
import { Stat, StatWithModifier } from '../../../../scripts/definitions/stat'
import React from 'react'

type StatItemProps = {
  name: string
  stat: Stat | StatWithModifier
}

export default function StatItem({ stat, name }: StatItemProps) {
  return (
    <Container stat={stat.value}>
      <label>{name}</label>
      <div>
        <p>{stat.value}</p>
      </div>
    </Container>
  )
}

const Container = styled.div<{ stat: number }>`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  margin: 1px;

  > label {
    width: 50px;
  }

  > div {
    display: flex;
    align-items: center;
    height: 25px;
    background-color: ${({ stat }) => {
      return stat < 25 ? 'red' : stat <= 50 ? 'yellow' : stat <= 75 ? 'orange' : 'green'
    }};
    padding-left: 1px;
    color: white;
    width: ${({ stat }) => (stat / 150) * 100}%;
    transition: width 0.5s ease-in-out;

    > p {
      width: 28px;
      margin-left: 3px;
    }
  }
`
