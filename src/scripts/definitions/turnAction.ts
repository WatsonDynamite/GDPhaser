import { GridSpot } from '../../gameObjects/gridSpot'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { moveList } from '../data/moveList'
import BattleScene from '../scenes/battleScene'
import { SocketEvents, Targeting } from './enums'
import { Monster } from './monster'
import { Move } from './move'
import { Message } from './serverPayloads'

export abstract class TurnAction {
  private user: Monster
  public priorityCalc: number

  constructor(user: Monster) {
    this.user = user
  }

  public getUser(): Monster {
    return this.user
  }

  public abstract executeTurnAction()
}

interface HasTurnActionExecution {
  executeTurnAction: Function
}

export class TurnActionDTO {
  userID: string
  priorityCalc: number

  constructor(usrID: string, priority: number) {
    this.userID = usrID
    this.priorityCalc = priority
  }
}

export class TurnActionMove extends TurnAction {
  private move: Move
  private target: TurnActionTarget

  constructor(move: Move, user: Monster, target: TurnActionTarget) {
    super(user)
    this.move = move
    this.target = target
  }

  public static getInstanceFromDTO(DTO: TurnActionMoveDTO): TurnActionMove | null {
    const { moveID, targetID, userID } = DTO
    const { myMonsters, enemyMonsters } = BattleScene.getFieldMonsters()
    const allFieldMonsters = [...myMonsters, ...enemyMonsters]
    const userMonster = allFieldMonsters.find((mon) => {
      return mon.getBattleId() === userID
    })
    const targetMonster = allFieldMonsters.find((mon) => mon.getBattleId() === targetID)

    if (!userMonster || !targetMonster) {
      console.log('but it failed!')
      return null
      //could it be that the move failed because the target or the user fainted? remember to verify later
    }
    return new TurnActionMove(moveList.get(moveID)!, userMonster, targetMonster)
  }

  public getTarget(): TurnActionTarget {
    return this.target
  }

  public getMove(): Move {
    return this.move
  }

  override
  public async executeTurnAction(): Promise<void> {
    return new Promise((resolve) => {
      const eventDispatcher = CustomEventDispatcher.getInstance()
      const msg: Message = {
        user: '',
        message: `${this.getUser().name} used ${this.getMove().name}!!`
      }
      BattleScene.socketClient.emit(SocketEvents.CHAT_MESSAGE, msg)

      eventDispatcher.emit(CustomEvents.SHOW_MOVE_PLATE, this.getMove().name)
    })
  }
}

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
  | TurnActionMove
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
