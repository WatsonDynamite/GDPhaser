import React from 'react'
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
    }
  } = battleScene

  const { myMonsters, enemyMonsters } = battleScene.getFieldMonsters()!
  console.log(myMonsters)
  console.log(enemyMonsters)

  return (
    <FullScreenContainerDiv>
      <Chat />
      {myMonsters.map((monster: Monster) => (
        <MonsterPlate monster={monster} camera={camera} canvas={domElement} />
      ))}
      {enemyMonsters.map((monster: Monster) => (
        <MonsterPlate monster={monster} camera={camera} canvas={domElement} />
      ))}
      <BattleControls monster={myMonsters[0]} />
    </FullScreenContainerDiv>
  )
}
