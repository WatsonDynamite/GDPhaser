export enum Category { //whether the move uses sp.atk to hit sp.def or uses atk to hit def
  PHYSICAL,
  SPECIAL,
  STATUS
}

export enum StatusEffectIndex {
  POISONED,
  BURNED
}

export enum SecondaryEffectType { //whether the secondary effect of the move applies to the user or the target
  SELF,
  OTHER
}

export enum SecondaryEffectEffect { //the name of the effect proper. This doesn't actually -do- anything, the actual effect is applied on CombatController.
  //HEALING
  HEALING_HALF, //50% HP recovery
  //BOOSTS
  BOOST_ATK_1, //+1 atk
  BOOST_DEF_1, //+1 def
  BOOST_SP_ATK_1, //you get the idea...
  BOOST_SP_DEF_1,
  BOOST_SPEED_1,
  //DROPS
  LOWER_ATK_1, //-1 atk
  LOWER_DEF_1, //-1 def
  LOWER_SP_ATK_1, //you get the idea...
  LOWER_SP_DEF_1,
  LOWER_SPEED_1,
  //STATUSES
  POISON_FIVE, //poisons for 5 turns
  BURN_FIVE //burns for 5 turns
}

export enum AbilityFrequency {
  SWITCH_IN, //ability triggers when monster switches in
  ABILITY_USER_MOVE, //ability triggers when monster uses a move
  ABILITY_TARGET_MOVE, //ability triggers when monster is hit by a move
  ABILITY_PERIODIC //ability triggers periodically
}

export enum Targeting {
  USER,
  SINGLE_ENEMY,
  SINGLE_TEAMMATE,
  SINGLE_GRID_SELF,
  SINGLE_GRID_ENEMY,
  MULTIPLE_ENEMY,
  MULTIPLE_TEAMMATE,
  MULTIPLE_GRID_OTHER,
  MULTIPLE_GRID_SELF,
  MULTIPLE_GRID_SELF_FORMATION,
  MULTIPLE_GRID_OTHER_FORMATION
}

export enum SocketEvents {
  CONNECT = 'connect', // connect to server
  DISCONNECT = 'disconnect', // disconnect from server
  INIT_DATA = 'initData', // initialize battle data
  CHAT_MESSAGE = 'chatMessage', // chat message
  LOAD_CHAT_HISTORY = 'loadChatHistory', // chat history from server
  SEND_TURN_ACTIONS = 'sendTurnActions', // send user turn actions
  YOU_ARE = 'youAre', // tell player who they are in the server
  REFRESH_GAME_STATE = 'refreshGameState', // rehydrate local depictions of the battle (sync between players)
  GAME_READY = 'gameReady', // both players connected
  TURNS_READY = 'turnsReady' // both players selected their turn outline
}
