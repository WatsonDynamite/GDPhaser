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
  INIT_BATTLE_UI = 'init_battle_ui',
  HIDE_BATTLE_UI = 'hide_battle_ui',
  SHOW_BATTLE_UI = 'show_battle_ui',
  QUEUE_TURN_ACTION = 'queue_turn_action'
}
