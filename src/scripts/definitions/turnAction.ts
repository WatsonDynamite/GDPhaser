import { GridSpot } from '../../gameObjects/gridSpot'
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
  private target: Monster | GridSpot

  constructor(move: Move, user: Monster, target: Monster | GridSpot) {
    super(user)
    this.move = move
    this.target = target
  }

  public getTarget(): Monster | GridSpot {
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
