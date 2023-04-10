import { GridSpot } from '../../gameObjects/gridSpot'
import { Targeting } from './enums'
import { Monster } from './monster'
import { Move } from './move'

export class TurnAction {
  private user: Monster

  constructor(user: Monster) {
    this.user = user
  }

  public getUser(): Monster {
    return this.user
  }

  public executeAction() {}
}

export class TurnActionMove extends TurnAction {
  private move: Move
  private target: TurnActionTarget

  constructor(move: Move, user: Monster, target: TurnActionTarget) {
    super(user)
    this.move = move
    this.target = target
  }

  public getTarget(): TurnActionTarget {
    return this.target
  }

  public getMove(): Move {
    return this.move
  }
}

export class TurnActionSwitch extends TurnAction {
  private replacement: Monster

  constructor(user: Monster, replacement: Monster) {
    super(user)
    this.replacement = replacement
  }

  public getReplacement(): Monster {
    return this.replacement
  }
}

export class TurnActionMoveRow extends TurnAction {}

export class TurnActionMoveCol extends TurnAction {}

export class TurnActionRest extends TurnAction {}

export class TurnActionUseItem extends TurnAction {}

export type TurnActionTarget = Monster | Monster[] | GridSpot | GridSpot[]

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
