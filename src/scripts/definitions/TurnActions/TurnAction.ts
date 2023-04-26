import { Monster } from '../monster'
import { CompoundTurnActionType } from '../turnAction'

export abstract class TurnAction {
  private user: Monster
  public priorityCalc: number

  constructor(user: Monster) {
    this.user = user
  }

  public getUser(): Monster {
    return this.user
  }

  public abstract executeTurnAction(turnData: { actionMap: CompoundTurnActionType[] }, callback?)
}

export class TurnActionDTO {
  userID: string
  priorityCalc: number

  constructor(usrID: string, priority: number) {
    this.userID = usrID
    this.priorityCalc = priority
  }
}
