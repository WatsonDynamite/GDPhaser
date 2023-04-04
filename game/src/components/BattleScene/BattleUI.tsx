import React, { useEffect, useState } from 'react'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'
import { Monster } from '../../scripts/definitions/monster'
import BattleScene from '../../scripts/scenes/battleScene'
import FullScreenContainerDiv from '../FullScreenContainer'
import BattleControls from './BattleControls/BattleControls'
import Chat from './Chat'
import MonsterPlate from './MonsterPlate'

type BattleUIProps = {
  battleScene: BattleScene
}

export default function BattleUI({ battleScene }: BattleUIProps) {
  const {
    third: {
      camera,
      renderer: { domElement }
    },
    socketClient
  } = battleScene

  const { myMonsters, enemyMonsters } = battleScene.getFieldMonsters()

  const [currentMonster, setCurrentMonster] = useState<number>(0)
  const [isShowingUI, setIsShowingUI] = useState<boolean>(true)

  function handleTurnQueue() {
    if (currentMonster === myMonsters.length - 1) {
      //time to send the move queue to the server
      if (myMonsters[0]) setCurrentMonster(0)
      setIsShowingUI(false)
    } else {
      if (myMonsters[currentMonster + 1]) {
        setCurrentMonster(currentMonster + 1)
      }
    }
  }

  CustomEventDispatcher.getInstance().on(CustomEvents.QUEUE_TURN_ACTION, () => {
    handleTurnQueue()
    console.log('hit')
  })
  CustomEventDispatcher.getInstance().on(CustomEvents.SHOW_BATTLE_UI, () => {
    setIsShowingUI(true)
  })
  CustomEventDispatcher.getInstance().on(CustomEvents.HIDE_BATTLE_UI, () => {
    setIsShowingUI(false)
  })

  return (
    <FullScreenContainerDiv>
      <Chat socketClient={socketClient} />
      {myMonsters.map((monster: Monster) => (
        <MonsterPlate key={`1-${monster.name}`} monster={monster} camera={camera} canvas={domElement} />
      ))}
      {enemyMonsters.map((monster: Monster) => (
        <MonsterPlate key={`2-${monster.name}`} monster={monster} camera={camera} canvas={domElement} />
      ))}
      {isShowingUI && <BattleControls monster={myMonsters[currentMonster]} />}
    </FullScreenContainerDiv>
  )
}
