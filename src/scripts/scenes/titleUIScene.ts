import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'

export default class TitleUIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleUIScene' })
  }

  preload() {}

  create() {
    CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_TITLE_SCREEN, this)
  }
}
