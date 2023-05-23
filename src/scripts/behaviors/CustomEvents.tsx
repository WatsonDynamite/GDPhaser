import React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot, Root } from 'react-dom/client'
import BattleUI from '../../components/BattleScene/BattleUI'
import BattleScene from '../scenes/battleScene'
import CustomEventDispatcher, { CustomEvents } from './CustomEventDispatcher'
import titleUIScene from '../scenes/titleUIScene'
import ConnectToServer from '../../components/ConnectToServerScene/ConnectToServer'
import WaitingForPlayers from '../../components/ConnectToServerScene/WaitingForPlayers'
import TitleScreen from '../../components/TitleScreen'
import Teambuilder from '../../components/Teambuilder'
import { Team } from '../definitions/team'
import TeamEditor from '../../components/Teambuilder/editor'

export function init() {}

let root = createRoot(document.getElementById('react-root')!)
const events = CustomEventDispatcher.getInstance()

events.on(CustomEvents.INIT_TITLE_SCREEN, (titleUIScene: titleUIScene) =>
  root.render(<TitleScreen scene={titleUIScene} />)
)

events.on(CustomEvents.INIT_TEAMBUILDER, () => root.render(<Teambuilder />))

events.on(CustomEvents.INIT_TEAM_EDITOR, (edit?: { team: Team; idx: number }) =>
  root.render(<TeamEditor edit={edit} />)
)

events.on(CustomEvents.INIT_BATTLE_UI, (battleScene: BattleScene) =>
  root.render(<BattleUI battleScene={battleScene} />)
)

events.on(CustomEvents.INIT_CONNECT_UI, (titleUIScene: titleUIScene) =>
  root.render(<ConnectToServer scene={titleUIScene} />)
)

events.on(CustomEvents.INIT_WAITING_FOR_PLAYERS_UI, () => {
  root.render(<WaitingForPlayers />)
})
