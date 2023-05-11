import React from 'react'
import styled from 'styled-components'
import titleUIScene from '../../scripts/scenes/titleUIScene'
import FullScreenContainerDiv from '../FullScreenContainer'
import logogif from '../../assets/UISprites/logo.gif'
import dirt from '../../assets/materials/dirt.jpg'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'

export type TitleScreenProps = {
  scene: titleUIScene
}

export default function TitleScreen({ scene }: TitleScreenProps) {
  return (
    <FullScreenContainerDiv>
      <Container>
        <img src={logogif} />
        <Buttons>
          <button onClick={() => CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CONNECT_UI)}>
            Connect to Server
          </button>
          <button onClick={() => CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_TEAMBUILDER)}>
            Teambuilder
          </button>
        </Buttons>
      </Container>
    </FullScreenContainerDiv>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    font-size: 3rem;
    margin-bottom: 10%;
  }
`

const Container = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: url(${dirt});

  > img {
    margin-top: 5%;
    width: 50%;
  }

  > * {
    font-size: 2rem;
  }

  > div {
    color: white;
  }

  > button {
    margin-top: 5%;
  }

  > h1 {
    color: red;
  }
`
