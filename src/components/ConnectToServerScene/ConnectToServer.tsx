import React from 'react'
import styled from 'styled-components'
import titleUIScene from '../../scripts/scenes/titleUIScene'
import FullScreenContainerDiv from '../FullScreenContainer'
import logogif from '../../assets/UISprites/logo.gif'
import dirt from '../../assets/materials/dirt.jpg'
import { io } from 'socket.io-client'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'

export type ConnectToServerProps = {
  scene: titleUIScene
}

export default function ConnectToServer({ scene }: ConnectToServerProps) {
  const [username, setUserName] = React.useState<string>('')
  const [ipAddr, setIpAddr] = React.useState<string>('localhost:3002')
  const [isErr, setIsErr] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  function handleConnect() {
    //CustomEventDispatcher.getInstance().emit(CustomEvents)

    const socketClient = io(ipAddr, { autoConnect: false })
    socketClient.auth = { username }
    socketClient.connect()
    socketClient.on('connect', () => {
      setIsErr(false)
      setIsSuccess(true)
      scene.scene.start('BattleScene', { socketClient, username })
    })
    socketClient.on('disconnect', () => {
      setIsSuccess(false)
      setIsErr(true)
    })
  }

  return (
    <FullScreenContainerDiv>
      <Container>
        <button
          style={{ position: 'absolute', top: '1%', left: '1%', margin: 0 }}
          onClick={() => CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_TITLE_SCREEN)}
        >
          {'<<< Back'}
        </button>
        <img src={logogif} />

        <div>Player Name</div>
        <input value={username} onChange={(e) => setUserName(e.currentTarget.value)}></input>
        <div>server IP</div>
        <input value={ipAddr} onChange={(e) => setIpAddr(e.currentTarget.value)}></input>
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
