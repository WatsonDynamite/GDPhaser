import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import _ from 'lodash'
import { GridSpot } from '../../gameObjects/gridSpot'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { Monster } from '../definitions/monster'
import { blastoise, charizard, venusaur } from '../data/monsterList'
import { EventEmitter } from 'stream'
import { TurnAction } from '../definitions/turnAction'
import { io } from 'socket.io-client'

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'BattleScene' })
  }

  private EventDispatcher = CustomEventDispatcher.getInstance()

  private playerGrid: GridSpot[][]
  private enemyGrid: GridSpot[][]

  p1party: Monster[]
  p2party: Monster[]

  actionQueue: TurnAction[]

  socketClient

  init(data) {
    this.actionQueue = []
    this.accessThirdDimension()
    this.setScene()
    console.log(data)
    this.socketClient = data.socketClient
  }

  create() {
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

  async setScene() {
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

      const p1party = _.cloneDeep([venusaur, blastoise, charizard])
      const p2party = _.cloneDeep([charizard, venusaur, blastoise])

      for (let i = 0; i < 3; i++) {
        const spritep1 = await this.createMonsterSprite(p1party[i], playerGrid[i][0])
        playerGrid[i][0].setMonster(spritep1)

        const spritep2 = await this.createMonsterSprite(p2party[i], enemyGrid[i][0])
        enemyGrid[i][0].setMonster(spritep2)
      }

      this.playerGrid = playerGrid
      this.enemyGrid = enemyGrid
      this.p1party = p1party
      this.p2party = p2party
    }

    await initialSetup()
    this.EventDispatcher.emit(CustomEvents.INIT_BATTLE_UI, this)
  }

  update() {
    //ui events
    //if (this.monster1) {
    //}
  }

  getFieldMonsters() {
    const foundMonsters: {
      myMonsters: Monster[]
      enemyMonsters: Monster[]
    } = {
      myMonsters: [],
      enemyMonsters: []
    }

    this.playerGrid.forEach((items: GridSpot[]) => {
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

  executeTurnActions() {}

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
    mon.anims.add('run', { start: 8, end: 13, rate: 20 })
    mon.anims.add('jump', { timeline: [16, 17, 18, 19, 20, 21, 22, 23, 0], rate: 20, repeat: 1 })

    mon.anims.play('idle')

    mon.setScale(0.0027)
    const { x, y, z } = grid.getModel().position
    mon.position.set(x, y + 0.11, z)
    monster.setGameObject(mon)
    this.third.scene.add(mon)

    return monster
  }
}
