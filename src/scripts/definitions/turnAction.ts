import { GridSpot } from '../../gameObjects/gridSpot'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { moveList } from '../data/moveList'
import BattleScene from '../scenes/battleScene'
import { TurnActionDTO, TurnAction } from './TurnActions/TurnAction'
import { TurnActionDamageMoveSingleTarget } from './TurnActions/TurnActionDamageMoveSingleTarget'
import { Category, SocketEvents, Targeting } from './enums'
import { Monster } from './monster'
import { Move } from './move'
import { Message } from './serverPayloads'
import { effectiveness } from './type'

export class TurnActionMoveDTO extends TurnActionDTO {
  moveID: string
  targetID: string | string[]

  constructor(usrID: string, priority: number, moveID: string, targetID: string | string[]) {
    super(usrID, priority)
    ;(this.moveID = moveID), (this.targetID = targetID)
  }
}

export class TurnActionSwitch extends TurnAction {
  public executeTurnAction() {
    throw new Error('Method not implemented.')
  }
  private replacement: Monster

  constructor(user: Monster, replacement: Monster, userID: string) {
    super(user)
    this.replacement = replacement
  }

  public getReplacement(): Monster {
    return this.replacement
  }
}

export class TurnActionChangeRow extends TurnAction {
  public executeTurnAction() {
    throw new Error('Method not implemented.')
  }
}

export class TurnActionChangeCol extends TurnAction {
  public executeTurnAction() {
    throw new Error('Method not implemented.')
  }
}

export class TurnActionRest extends TurnAction {
  public executeTurnAction() {
    throw new Error('Method not implemented.')
  }
}

export class TurnActionUseItem extends TurnAction {
  public executeTurnAction() {
    throw new Error('Method not implemented.')
  }
}

export type TurnActionTarget = Monster | Monster[] | GridSpot | GridSpot[]

export type CompoundTurnActionType =
  | TurnActionDamageMoveSingleTarget
  | TurnActionSwitch
  | TurnActionChangeRow
  | TurnActionChangeCol
  | TurnActionRest
  | TurnActionUseItem

export type CompoundTurnActionDTOType = TurnActionMoveDTO

export type MoveTargeting =
  | { targeting: Targeting.USER }
  | { targeting: Targeting.SINGLE_ENEMY }
  | { targeting: Targeting.SINGLE_TEAMMATE }
  | { targeting: Targeting.SINGLE_GRID_SELF }
  | { targeting: Targeting.SINGLE_GRID_ENEMY }
  | {
      targeting:
        | Targeting.MULTIPLE_ENEMY
        | Targeting.MULTIPLE_TEAMMATE
        | Targeting.MULTIPLE_GRID_OTHER
        | Targeting.MULTIPLE_GRID_SELF
      qty: number
    }
  | {
      targeting: Targeting.MULTIPLE_GRID_SELF_FORMATION | Targeting.MULTIPLE_GRID_OTHER_FORMATION
      formation: number[][]
    }
