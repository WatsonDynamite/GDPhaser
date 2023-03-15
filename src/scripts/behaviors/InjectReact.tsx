import React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot, Root } from 'react-dom/client'
import Chat from '../../components/Chat'
import FullScreenContainer from '../../components/FullScreenContainer'
import MonsterPlate, { MonsterPlateProps } from '../../components/MonsterPlate'
import CustomEventDispatcher, { CustomEvents } from './CustomEventDispatcher'

export default function injectReact() {
  //ReactDOM.render(<App />, document.getElementById("react-root"))
}

let root = createRoot(document.getElementById('react-root')!)
let canvas = root.render(<FullScreenContainer />)

const emmiter = CustomEventDispatcher.getInstance()

//emmiter.on(CustomEvents.INIT_REACT_CANVAS, () => injectCanvas())
//emmiter.on(CustomEvents.INIT_CHAT_UI, () => injectComponent(Chat))
//emmiter.on(CustomEvents.RENDER_MONSTER_PLATE, (args: MonsterPlateProps) => injectComponent(MonsterPlate, args))
