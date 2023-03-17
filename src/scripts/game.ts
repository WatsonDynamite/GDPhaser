import * as Phaser from 'phaser'
import { enable3d, Canvas } from '@enable3d/phaser-extension'
import BattleScene from './scenes/battleScene'
import PreloadScene from './scenes/preloadScene'
import injectReact from './behaviors/InjectReact'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PreloadScene, BattleScene],
  ...Canvas()
}

window.addEventListener('load', () => {
  enable3d(() => new Phaser.Game(config)).withPhysics('assets/ammo')
})

injectReact()
