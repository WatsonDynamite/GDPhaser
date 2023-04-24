import CustomEventDispatcher, { CustomEvents } from '../../behaviors/CustomEventDispatcher'
import { moveList } from '../../data/moveList'
import BattleScene from '../../scenes/battleScene'
import { BATTLE_CONSTANT } from '../battle'
import { SocketEvents, Category } from '../enums'
import { Monster } from '../monster'
import { Move } from '../move'
import { TurnActionMoveDTO } from '../turnAction'
import { effectiveness } from '../type'
import { TurnAction } from './TurnAction'

export class TurnActionDamageMoveSingleTarget extends TurnAction {
  private move: Move
  private target: Monster

  constructor(move: Move, user: Monster, target: Monster) {
    super(user)
    this.move = move
    this.target = target
  }

  public static getInstanceFromDTO(DTO: TurnActionMoveDTO): TurnActionDamageMoveSingleTarget | null {
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
    return new TurnActionDamageMoveSingleTarget(moveList.get(moveID)!, userMonster, targetMonster)
  }

  public getTarget(): Monster {
    return this.target
  }

  public getMove(): Move {
    return this.move
  }

  override
  public async executeTurnAction(): Promise<void> {
    return new Promise(async (resolve) => {
      const { category, type, power, name } = this.getMove()
      const { name: targetName, stats: targetStats, type1: targetType1, type2: targetType2 } = this.getTarget()
      const { name: userName, stats: userStats, type1: userType1, type2: userType2 } = this.getUser()
      const isSTAB = type === userType1 || type === userType2
      const eventDispatcher = CustomEventDispatcher.getInstance()
      const msg = `${this.getUser().name} used ${this.getMove().name}!!`

      eventDispatcher.emit(CustomEvents.SHOW_MOVE_PLATE, name)

      let effectivenessMessage = ''
      let effectivenessCalc = effectiveness(type, targetType1) * (targetType2 ? effectiveness(type, targetType2) : 1)

      if (category != Category.STATUS) {
        //you can only use status moves against gridspots, so in this case

        switch (effectivenessCalc) {
          case 4:
            effectivenessMessage = 'It was an overwhelming attack!'
            break
          case 2:
            effectivenessMessage = 'It was a great attack!'
            break
          case 0.5:
            effectivenessMessage = 'It was a mediocre attack...'
            break
          case 0.25:
            effectivenessMessage = 'It was a very underwhelming attack...'
            break
          case 0:
            effectivenessMessage = 'It was completely ineffective...'
            break
        }
      }

      //check if move is special or physical
      const attackingStat =
        this.getMove().category === Category.PHYSICAL ? userStats.str.getTrueValue() : userStats.int.getTrueValue()
      const defendingStat =
        this.getMove().category === Category.PHYSICAL ? targetStats.arm.getTrueValue() : targetStats.wis.getTrueValue()

      //TODO: subtract AP

      //Calculate the damage
      const dmg = Math.floor(
        ((power * (isSTAB ? 1.5 : 1) * attackingStat) / defendingStat) * BATTLE_CONSTANT * effectivenessCalc
      )

      console.log(
        `${userName} used ${name} on ${targetName} dealing ${dmg} damage with ${effectivenessCalc}x effectiveness`
      )

      //TODO: count the turns where CHARGE was used and modify damage based on that

      //Deal the damage
      await this.target.receiveDamage(dmg)

      if (BattleScene.whoami === 1) {
        BattleScene.socketClient.emit(SocketEvents.CHAT_MESSAGE, {
          usr: '',
          message: `${msg}\n${effectivenessMessage}`
        })
      }
      resolve()
    })
  }
}
