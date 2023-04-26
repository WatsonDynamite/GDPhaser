import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import _ from 'lodash'
import { GridSpot } from '../../gameObjects/gridSpot'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { io, Socket } from 'socket.io-client'
import { venusaur, blastoise, charizard, InstanceMonsterFromServerData } from '../data/monsterList'
import { Monster, MonsterDTO } from '../definitions/monster'
import { GameState, Message } from '../definitions/serverPayloads'
import { CompoundTurnActionDTOType, CompoundTurnActionType, TurnActionMoveDTO } from '../definitions/turnAction'
import { JsonSerializer } from 'typescript-json-serializer'
import { Category, SocketEvents, Targeting } from '../definitions/enums'
import { TurnAction, TurnActionDTO } from '../definitions/TurnActions/TurnAction'
import { moveList } from '../data/moveList'
import { TurnActionDamageMoveSingleTarget } from '../definitions/TurnActions/TurnActionDamageMoveSingleTarget'
import { sm } from 'jssm'

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'BattleScene' })
  }

  private EventDispatcher = CustomEventDispatcher.getInstance()
  private serializer = new JsonSerializer()

  //
  private static playerGrid: GridSpot[][]
  private static enemyGrid: GridSpot[][]

  public static playerparty: Monster[]
  public static enemyparty: Monster[]

  //who this player is in the server
  //in the client, the player is always player 1 and the opponent is always player 2
  //but in the server this might not be the case.
  //for the players to get the correct information, we need to know who's who
  public static whoami: number

  //actions to send to the server
  actionQueue: TurnActionDTO[]

  //socket.io client
  public static socketClient: Socket

  init(data) {
    this.actionQueue = []
    this.accessThirdDimension()
    this.setScene(() => {
      BattleScene.socketClient = data.socketClient
      BattleScene.socketClient.on(SocketEvents.YOU_ARE, (youAreData) => {
        BattleScene.whoami = youAreData
      })

      const playerMonsterDataForServer: { monster: MonsterDTO; row: number; col: number }[] = []

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
          const gridSpot = BattleScene.playerGrid[row][col]
          gridSpot.setBattleId(`${data.socketClient.id}-${row}-${col}`)
          const monster = gridSpot.getMonster()

          if (monster) {
            const monsterBattleId = `${data.socketClient.id}-${monster.name}`
            monster.setBattleId(monsterBattleId)
            playerMonsterDataForServer.push({
              monster: {
                id: monster.id,
                battleId: monsterBattleId,
                currentHP: monster.currentHP
              },
              row,
              col
            })
          }
        }
      }

      BattleScene.socketClient.emit(SocketEvents.INIT_DATA, {
        user: data.username,
        grid: playerMonsterDataForServer
      })
      BattleScene.socketClient.on(SocketEvents.REFRESH_GAME_STATE, (data) => this.refreshGameState(data))
      BattleScene.socketClient.on(SocketEvents.GAME_READY, () => {
        this.EventDispatcher.emit(CustomEvents.INIT_BATTLE_UI, this)
      })

      BattleScene.socketClient.on(SocketEvents.TURNS_READY, (turnData: CompoundTurnActionDTOType[]) => {
        this.executeTurnActions(turnData)
        this.EventDispatcher.emit(CustomEvents.BEGIN_TURN)
      })
    })
  }

  create() {
    this.EventDispatcher.emit(CustomEvents.INIT_WAITING_FOR_PLAYERS_UI)
    // creates a nice scene
    this.third.warpSpeed('-orbitControls', '-grid', '-lookAtCenter', '-ground')
    this.third.camera.translateX(4.300205939552442)
    this.third.camera.translateY(-5.13945596907)
    this.third.camera.translateZ(-2.95216046263)

    this.third.camera.setRotationFromEuler(
      new THREE.Euler(-0.4963543842116094, 0.3508399919982686, 0.18402730777738688)
    )

    this.third.load.preload('grass', '/assets/materials/grass.jpg')
    this.third.load.texture('grass').then((grass) => {
      grass.wrapS = grass.wrapT = 3 // RepeatWrapping
      grass.offset.set(0, 0)
      grass.repeat.set(50, 50)

      // BUG: To add shadows to your ground, set transparent = true
      this.third.physics.add.ground({ width: 20, height: 20, y: 0 }, { phong: { map: grass, transparent: true } })
    })
  }

  async setScene(callback: Function) {
    const initialSetup = async () => {
      const playerGrid = [
        [
          new GridSpot(1, 'front', this, { x: 3.45, y: 0.51, z: 8.4 }),
          new GridSpot(1, 'back', this, { x: 3.45, y: 0.51, z: 8.6 })
        ],
        [
          new GridSpot(1, 'front', this, { x: 3.7, y: 0.51, z: 8.4 }),
          new GridSpot(1, 'back', this, { x: 3.7, y: 0.51, z: 8.6 })
        ],
        [
          new GridSpot(1, 'front', this, { x: 3.95, y: 0.51, z: 8.4 }),
          new GridSpot(1, 'back', this, { x: 3.95, y: 0.51, z: 8.6 })
        ]
      ]
      const enemyGrid = [
        [
          new GridSpot(2, 'front', this, { x: 3.95 + 0.15, y: 0.51, z: 7.8 }),
          new GridSpot(2, 'back', this, { x: 3.95 + 0.23, y: 0.51, z: 7.6 })
        ],
        [
          new GridSpot(2, 'front', this, { x: 3.7 + 0.15, y: 0.51, z: 7.8 }),
          new GridSpot(2, 'back', this, { x: 3.7 + 0.23, y: 0.51, z: 7.6 })
        ],
        [
          new GridSpot(2, 'front', this, { x: 3.45 + 0.15, y: 0.51, z: 7.8 }),
          new GridSpot(2, 'back', this, { x: 3.45 + 0.23, y: 0.51, z: 7.6 })
        ]
      ]

      const playerparty = _.cloneDeep([venusaur, blastoise, charizard])

      for (let i = 0; i < 3; i++) {
        const spritep1 = await this.createMonsterSprite(playerparty[i], playerGrid[i][0])
        playerGrid[i][0].setMonster(spritep1)
      }

      BattleScene.playerGrid = playerGrid
      BattleScene.enemyGrid = enemyGrid
      BattleScene.playerparty = playerparty

      callback()
    }

    await initialSetup()
  }

  update() {
    //ui events
    //if (this.monster1) {
    //}
  }

  /**
   * A function that rehydrates local game state with data from the server.
   */
  refreshGameState(data: GameState) {
    console.log(data)
    const { field } = data
    const enemyGridFromServer = BattleScene.whoami === 1 ? field.player2grid : field.player1grid
    //this.enemyGrid = enemyGrid

    enemyGridFromServer.forEach(({ monster, row, col }) => {
      const serverMonster = InstanceMonsterFromServerData(monster)
      const gridSpot = BattleScene.enemyGrid[row][col]
      gridSpot.setMonster(serverMonster)
      this.createMonsterSprite(serverMonster, gridSpot)
    })
  }

  /**
   * A simple function to obtain grid status for either player
   * @returns a double array of GridSpot
   */
  getGrid() {
    return {
      playerGrid: BattleScene.playerGrid,
      enemyGrid: BattleScene.enemyGrid
    }
  }

  /**
   * A function to obtain every monster currently on the field, from either player
   * @returns a double array of every monster currently on screen.
   */
  public static getFieldMonsters() {
    const foundMonsters: {
      myMonsters: Monster[]
      enemyMonsters: Monster[]
    } = {
      myMonsters: [],
      enemyMonsters: []
    }

    BattleScene.playerGrid.forEach((items: GridSpot[]) => {
      items.forEach((el) => {
        const mon = el.getMonster()
        if (mon) foundMonsters.myMonsters.push(mon)
      })
    })

    this.enemyGrid.forEach((items: GridSpot[]) => {
      items.forEach((el) => {
        const mon = el.getMonster()
        if (mon) foundMonsters.enemyMonsters.push(mon)
      })
    })

    return foundMonsters
  }

  popTurnAction() {
    this.actionQueue.pop()
  }

  addTurnAction(act: TurnActionDTO) {
    const playerMonsterCount = BattleScene.getFieldMonsters().myMonsters.length
    this.actionQueue.push(act)
    if (this.actionQueue.length === playerMonsterCount) {
      //send to server
      try {
        const serializedActionArray = this.serializer.serializeObjectArray(this.actionQueue)
        BattleScene.socketClient.emit('sendTurnActions', serializedActionArray)
        this.EventDispatcher.emit(CustomEvents.READY_FOR_OPPONENT)
        this.actionQueue = []
      } catch (err) {
        console.error(err)
      }
    }
  }

  executeTurnActions(actions: CompoundTurnActionDTOType[]) {
    const instancedTurnActions = {
      actionMap: actions
        .map((dto) => {
          //time to make these real
          //check what type of action this is
          if (dto.moveID) {
            const move = moveList.get(dto.moveID)!

            if (move.category !== Category.STATUS) {
              switch (move.targeting.targeting) {
                case Targeting.SINGLE_ENEMY:
                case Targeting.SINGLE_TEAMMATE:
                  return TurnActionDamageMoveSingleTarget.getInstanceFromDTO(dto)
              }
            }
          }
        })
        .filter((el) => el !== null && el !== undefined) as CompoundTurnActionType[]
    }

    let i = 0

    const globalTurnSM = sm`Flip 'next' -> Flop 'next' -> Flip;`
    globalTurnSM.hook_any_action(() => {
      const turnAct = instancedTurnActions.actionMap[i]
      turnAct.executeTurnAction(instancedTurnActions, () => {
        i++
        globalTurnSM.do('next')
      })
    })
    globalTurnSM.do('next')
  }

  /**
   *
   * @param {Monster} monster - the Monster's data struct
   * @param {GridSpot} grid - the gameobject for the spot in the grid where the monster will spawn
   */
  async createMonsterSprite(monster: Monster, grid: GridSpot) {
    //get sprite
    const {
      sprites: { frontSpritePath, backSpritePath }
    } = monster
    const isPlayer1 = grid.getPlayer() === 1
    const spritePath = isPlayer1 ? backSpritePath : frontSpritePath
    const sizes = isPlayer1 ? { width: 98, height: 83 } : { width: 89, height: 91 }
    const texture = await this.third.load.texture(spritePath)

    //if the sprite is blurry, then use the "remove duplicates" flag on aseprite's spritesheet export
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter

    const mon = new FLAT.SpriteSheet(texture, sizes)

    mon.anims.add('idle', { start: 0, end: 93, rate: 20 })

    mon.anims.play('idle')

    mon.setScale(0.0027)
    const { x, y, z } = grid.getModel().position
    mon.position.set(x, y + 0.11, z)
    monster.setGameObject(mon)
    this.third.scene.add(mon)

    return monster
  }
}
