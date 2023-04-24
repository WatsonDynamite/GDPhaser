import React, { useEffect, useState } from 'react'
import CustomEventDispatcher, { CustomEvents } from '../../scripts/behaviors/CustomEventDispatcher'
import { Monster } from '../../scripts/definitions/monster'
import BattleScene from '../../scripts/scenes/battleScene'
import FullScreenContainerDiv from '../FullScreenContainer'
import BattleControls from './BattleControls/BattleControls'
import Chat from './Chat'
import MonsterPlate from './MonsterPlate'
import BattleDataContext from '../BattleDataContext'
import MovePlate from './MovePlate'

type BattleUIProps = {
  battleScene: BattleScene
}

export default function BattleUI({ battleScene }: BattleUIProps) {
  const {
    third: {
      camera,
      renderer: { domElement }
    }
  } = battleScene
  const customEventDispatcher = CustomEventDispatcher.getInstance()
  const { myMonsters, enemyMonsters } = BattleScene.getFieldMonsters()
  const [currentMonster, setCurrentMonster] = useState<number>(0)
  const [isShowingUI, setIsShowingUI] = useState<boolean>(true)
  const [movePlateText, setMovePlateText] = useState<string | null>(null)

  useEffect(() => {
    customEventDispatcher.on(CustomEvents.SHOW_BATTLE_UI, () => {
      setIsShowingUI(true)
    })
    customEventDispatcher.on(CustomEvents.HIDE_BATTLE_UI, () => {
      setIsShowingUI(false)
    })
  }, [])

  customEventDispatcher.on(CustomEvents.SHOW_MOVE_PLATE, (text) => {
    setMovePlateText(text)
    setTimeout(() => {
      setMovePlateText(null)
    }, 800)
  })

  function moveToNextMonster() {
    if (currentMonster === myMonsters.length - 1) {
      if (myMonsters[0]) setCurrentMonster(0)
    } else {
      if (myMonsters[currentMonster + 1]) {
        setCurrentMonster(currentMonster + 1)
      }
    }
  }

  return (
    <BattleDataContext.Provider value={battleScene}>
      <FullScreenContainerDiv>
        <MovePlate text={movePlateText} />
        <Chat socketClient={BattleScene.socketClient} />
        {isShowingUI &&
          myMonsters.map((monster: Monster) => (
            <MonsterPlate key={`1-${monster.name}`} monster={monster} camera={camera} canvas={domElement} />
          ))}
        {isShowingUI &&
          enemyMonsters.map((monster: Monster) => (
            <MonsterPlate key={`2-${monster.name}`} monster={monster} camera={camera} canvas={domElement} />
          ))}
        {isShowingUI && (
          <BattleControls moveToNextMonster={moveToNextMonster} currentMonster={myMonsters[currentMonster]} />
        )}
      </FullScreenContainerDiv>
    </BattleDataContext.Provider>
  )
}
