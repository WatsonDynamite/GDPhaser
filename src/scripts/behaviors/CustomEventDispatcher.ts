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
  INIT_REACT_CANVAS = 'init_react_canvas', //starts react canvas on game boot
  INIT_BATTLE_UI = 'init_battle_ui', //injects battle scene UI
  HIDE_BATTLE_UI = 'hide_battle_ui', //tells battle scene UI to hide itself
  SHOW_BATTLE_UI = 'show_battle_ui', //tells battle scene UI to show itself
  SHOW_MOVE_PLATE = 'show_move_plate', //tells battle UI to display the move's name
  REFRESH_UI = 'refresh_ui', //refreshes UI

  ON_HP_BAR_TRANSITION_END = 'on_hp_bar_transition_end', //tells turn state machine to continue after depleting the HP of the monster

  INIT_TITLE_SCREEN = 'init_title_screen', //injects title screen
  INIT_TEAMBUILDER = 'init_teambuilder', //injects teambuilder
  INIT_TEAM_EDITOR = 'init_team_editor',
  INIT_CONNECT_UI = 'init_connect_ui', //injects connection screen UI
  INIT_WAITING_FOR_PLAYERS_UI = 'init_waiting_for_players_ui', //injects "waiting for players..." UI

  INIT_BATTLE_SCENE = 'init_battle_scene', //tells Phaser's scene manager to load battle scene

  QUEUE_TURN_ACTION = 'queue_turn_action', // queues a turn action to the buffer to send to the server
  READY_FOR_OPPONENT = 'ready_for_opponent', //sets the UI to show the "waiting for opponent..." message
  BEGIN_TURN = 'begin_turn' //sets the UI to only show the monsters' health bars
}
