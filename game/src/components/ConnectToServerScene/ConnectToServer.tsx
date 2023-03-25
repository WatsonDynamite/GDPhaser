import React from 'react'
import styled from 'styled-components'
import ConnectToServerScene from '../../scripts/scenes/connectToServerScene'
import FullScreenContainerDiv from '../FullScreenContainer'
import logogif from '../../assets/UISprites/logo.gif'
import dirt from '../../assets/materials/dirt.jpg'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'
import { io } from 'socket.io-client'

export type ConnectToServerProps = {
  scene: ConnectToServerScene
}

export default function ConnectToServer({ scene }: ConnectToServerProps) {
  const [username, setUserName] = React.useState<string>('')
  const [ipAddr, setIpAddr] = React.useState<string>('')
  const [isErr, setIsErr] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  function handleConnect() {
    //CustomEventDispatcher.getInstance().emit(CustomEvents)

    const socketClient = io(ipAddr)
    socketClient.on('connect', () => {
      setIsErr(false)
      setIsSuccess(true)
      scene.scene.start('BattleScene', { socketClient, username })
    })
    socketClient.on('disconnect', () => {
      setIsSuccess(false)
      setIsErr(true)
    })
    //if (socketClient.connected) {
    //} else {
    //  setIsErr(true)
    //}
  }

  return (
    <FullScreenContainerDiv>
      <Container>
        <img src={logogif} />

        <div>Player Name</div>
        <input onChange={(e) => setUserName(e.currentTarget.value)}></input>
        <div>server IP</div>
        <input onChange={(e) => setIpAddr(e.currentTarget.value)}></input>
        <button onClick={handleConnect} disabled={username === '' || ipAddr === ''}>
          CONNECT
        </button>
        {isErr && <h1>ERROR: SERVER NOT FOUND AT SPECIFIED ADDRESS</h1>}
        {isSuccess && <h2>SUCCESS</h2>}
      </Container>
    </FullScreenContainerDiv>
  )
}

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
