import { Scene3D } from '@enable3d/phaser-extension'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'

export default class ConnectToServerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ConnectToServerScene' })
  }

  preload() {}

  create() {
    CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CONNECT_UI, this)
  }
}
