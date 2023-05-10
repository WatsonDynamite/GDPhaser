import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useInterval } from 'usehooks-ts'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'

interface MonsterHPProps {
  currentHP: number
  maxHP: number
}

export default function MonsterHP({ currentHP, maxHP }: MonsterHPProps) {
  return (
    <HealthBar
      onTransitionEnd={() => CustomEventDispatcher.getInstance().emit(CustomEvents.ON_HP_BAR_TRANSITION_END, currentHP)}
      percent={(currentHP / maxHP) * 100}
    >
      <div />
      <h2>
        {currentHP}/{maxHP}
      </h2>
    </HealthBar>
  )
}

const HealthBar = styled.div<{ percent: number }>`
  width: inherit;
  background-color: darkgray;
  display: flex;
  justify-content: start;
  height: 25px;

  > div {
    background-color: ${({ percent }) => {
      return percent < 25 ? 'red' : percent <= 50 ? 'yellow' : percent <= 75 ? 'orange' : 'green'
    }};
    width: ${({ percent }) => percent}%;
    transition: width 0.5s ease-in-out;
  }

  > h2 {
    filter: invert(0.2);
    mix-blend-mode: difference;
    font-size: 1.2rem;
    position: absolute;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`
