import React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot, Root } from 'react-dom/client'
import BattleUI from '../../components/BattleScene/BattleUI'
import BattleScene from '../scenes/battleScene'
import CustomEventDispatcher, { CustomEvents } from './CustomEventDispatcher'
import ConnectToServerScene from '../scenes/connectToServerScene'
import ConnectToServer from '../../components/ConnectToServerScene/ConnectToServer'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import WaitingForPlayers from '../../components/ConnectToServerScene/WaitingForPlayers'

export function init() {}

let root = createRoot(document.getElementById('react-root')!)
const events = CustomEventDispatcher.getInstance()

events.on(CustomEvents.INIT_BATTLE_UI, (battleScene: BattleScene) =>
  root.render(<BattleUI battleScene={battleScene} />)
)

events.on(CustomEvents.INIT_CONNECT_UI, (connectToServerScene: ConnectToServerScene) =>
  root.render(<ConnectToServer scene={connectToServerScene} />)
)

events.on(CustomEvents.INIT_WAITING_FOR_PLAYERS_UI, () => {
  root.render(<WaitingForPlayers />)
})

//events.on(CustomEvents.INIT_BATTLE_SCENE, (socketClient: Socket<DefaultEventsMap, DefaultEventsMap>) => {
//  Phaser.
//})
