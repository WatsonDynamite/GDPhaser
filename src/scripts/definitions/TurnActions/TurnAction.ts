import { Monster } from '../monster'

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

export class TurnActionDTO {
  userID: string
  priorityCalc: number

  constructor(usrID: string, priority: number) {
    this.userID = usrID
    this.priorityCalc = priority
  }
}
