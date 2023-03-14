import * as Phaser from 'phaser'
import { enable3d, Canvas } from '@enable3d/phaser-extension'
import BattleScene from './scenes/battleScene'
import PreloadScene from './scenes/preloadScene'
import injectReact from './behaviors/InjectReact'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  scene: [PreloadScene, BattleScene],
  ...Canvas()
}

window.addEventListener('load', () => {
  enable3d(() => new Phaser.Game(config)).withPhysics('assets/ammo')
})

injectReact();