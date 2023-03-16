import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CustomEventDispatcher, { CustomEvents } from '../scripts/behaviors/CustomEventDispatcher'
import { Monster } from '../scripts/definitions/monster'
import MonsterPlate, { MonsterPlateProps } from './MonsterPlate'

//export default function FullScreenContainer() {
//  const [children, setChildren] = useState<JSX.Element[]>([])
//
//  const emitter = CustomEventDispatcher.getInstance()
//  useEffect(() => {
//    emitter.on(CustomEvents.RENDER_MONSTER_PLATE, (args: MonsterPlateProps) => {
//      setChildren((prev) => [...prev, <MonsterPlate {...args} />])
//    })
//  }, [emitter])
//  return <FullScreenContainerDiv id="react-canvas"></FullScreenContainerDiv>
//}
const FullScreenContainerDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;

  > * {
    position: relative;
    z-index: 1;
    user-select: none;
  }
`
export default FullScreenContainerDiv
