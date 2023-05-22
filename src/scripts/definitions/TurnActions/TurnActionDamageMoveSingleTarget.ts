import CustomEventDispatcher, { CustomEvents } from '../../behaviors/CustomEventDispatcher'
import { moveList } from '../../data/moveList'
import BattleScene from '../../scenes/battleScene'
import { BATTLE_CONSTANT } from '../battle'
import { SocketEvents, Category } from '../enums'
import { Monster } from '../monster'
import { Move } from '../move'
import { CompoundTurnActionType, TurnActionMoveDTO } from '../turnAction'
import { effectiveness } from '../type'
import { TurnAction } from './TurnAction'
import { sm } from 'jssm'

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
  public executeTurnAction(turnData: { actionMap: CompoundTurnActionType[] }, callback: Function) {
    return new Promise(async (resolve) => {
      const { category, type, power, name } = this.getMove()
      const { name: targetName, stats: targetStats, type1: targetType1, type2: targetType2 } = this.getTarget()
      const { name: userName, stats: userStats, type1: userType1, type2: userType2 } = this.getUser()
      const isSTAB = type === userType1 || type === userType2
      const eventDispatcher = CustomEventDispatcher.getInstance()
      const msg = `${userName} used ${this.getMove().name}!!`

      console.log(this.getUser())
      console.log(this.getTarget())

      const sendLogMessage = (msg: string) => {
        if (BattleScene.whoami === 1) {
          BattleScene.socketClient.emit(SocketEvents.CHAT_MESSAGE, {
            usr: '',
            message: `${msg}`
          })
        }
      }

      eventDispatcher.emit(CustomEvents.SHOW_MOVE_PLATE, name)

      let effectivenessMessage = ''
      let effectivenessCalc = effectiveness(type, targetType1) * (targetType2 ? effectiveness(type, targetType2) : 1)

      if (category != Category.BOON) {
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
        this.getMove().category === Category.PHYSICAL ? userStats.str.getTrueValue() : userStats.wis.getTrueValue()
      const defendingStat =
        this.getMove().category === Category.PHYSICAL ? targetStats.arm.getTrueValue() : targetStats.ins.getTrueValue()

      //TODO: subtract AP

      //Calculate the damage
      const dmg = Math.floor(
        ((power * (isSTAB ? 1.5 : 1) * attackingStat) / defendingStat) * BATTLE_CONSTANT * effectivenessCalc
      )

      //TODO: count the turns where CHARGE was used and modify damage based on that

      //Deal the damage, this is where our State Machine comes into place, god bless it.

      const fsm = sm`TurnStart 'begin' -> PlayUserAtkAnimation 'hit' -> PlayTargetHitAnimation 'damage' -> DealDamage 'TargetAlive' -> TurnEnd;
                        DealDamage 'TargetDead' -> PlayDeathAnimation 'finish' -> TurnEnd;`
      try {
        //SET UP MACHINE
        fsm.hook_any_action(() => console.log(fsm.state()))
        console.log(
          `${this.getUser().getBattleId()} used ${name} on ${this.getTarget().getBattleId()} dealing ${dmg} damage with ${effectivenessCalc}x effectiveness`
        )
        CustomEventDispatcher.getInstance().on(CustomEvents.ON_HP_BAR_TRANSITION_END, (currentHP) => {
          console.log('on hp bar transition end')
          if (currentHP > 0) {
            fsm.do('TargetAlive')
          } else {
            fsm.do('TargetDead')
          }
        })
        fsm.hook_entry('PlayUserAtkAnimation', () => {
          //console.log('Play User Attack Animation')
          sendLogMessage(msg)
          //console.log("this should play the user's attack animation. Waiting...")
          setTimeout(() => {
            fsm.do('hit')
          }, 300)
        })
        fsm.hook_entry('PlayTargetHitAnimation', () => {
          //console.log("this should play the target's 'take damage' animation. Waiting...")
          setTimeout(() => {
            sendLogMessage(effectivenessMessage)
            fsm.do('damage')
          }, 300)
        })

        fsm.hook_entry('DealDamage', () => {
          this.target.receiveDamage(dmg)
        })

        fsm.hook_entry('PlayDeathAnimation', () => {
          //write in chat that the monster is dead
          sendLogMessage(`${targetName} has been defeated!`)

          //TODO: execute death anim
          //console.log("this should play the target's death animation. Waiting...")

          setTimeout(() => {
            //remove monster from field
            const gridSpot = this.getTarget().getGridSpot()
            gridSpot.getMonster()?.getGameObject().remove()
            gridSpot.removeMonster()
            //also remove monster from play

            fsm.do('finish')
          }, 800)
        })

        //now that everything related to the state machine is ready, we can begin
        fsm.do('begin')

        fsm.hook_entry('TurnEnd', () => callback())
      } catch (err) {
        console.error(err)
      }
    })
  }
}

const TurnActionDamageMoveSingleTargetStateMachine = {}
