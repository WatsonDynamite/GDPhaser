import Phaser from 'phaser'

let instance: CustomEventDispatcher | null = null
export default class CustomEventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super()
  }

  static getInstance() {
    if (instance == null) {
      instance = new CustomEventDispatcher()
    }
    return instance
  }
}

export enum CustomEvents {
  INIT_REACT_CANVAS = 'init_react_canvas',
  INIT_CHAT_UI = 'init_chat_ui',
  INIT_BATTLE_UI = 'init_battle_ui',
  RENDER_MONSTER_PLATE = 'render_monster_plate'
}
