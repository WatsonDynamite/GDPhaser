import React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot, Root } from 'react-dom/client'
import BattleUI from '../../components/BattleScene/BattleUI'
import Chat from '../../components/BattleScene/Chat'
import FullScreenContainer from '../../components/FullScreenContainer'
import MonsterPlate, { MonsterPlateProps } from '../../components/BattleScene/MonsterPlate'
import BattleScene from '../scenes/battleScene'
import CustomEventDispatcher, { CustomEvents } from './CustomEventDispatcher'

export default function injectReact() {
  //ReactDOM.render(<App />, document.getElementById("react-root"))
}

let root = createRoot(document.getElementById('react-root')!)
//let canvas = root.render(<FullScreenContainer />)

const events = CustomEventDispatcher.getInstance()

events.on(CustomEvents.INIT_BATTLE_UI, (battleScene: BattleScene) =>
  root.render(<BattleUI battleScene={battleScene} />)
)
