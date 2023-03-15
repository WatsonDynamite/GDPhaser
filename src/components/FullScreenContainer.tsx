import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function FullScreenContainer() {
  const [children, setChildren] = useState<JSX.Element[]>()

  useEffect(() => {})
  return <FullScreenContainerDiv id="react-canvas">{children}</FullScreenContainerDiv>
}

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
