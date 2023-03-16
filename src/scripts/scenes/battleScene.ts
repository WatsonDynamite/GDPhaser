import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { Monster } from '../definitions/monster'
import { blastoise, charizard } from '../data/monsterList'
import { EventEmitter } from 'stream'

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'BattleScene' })
  }

  private EventDispatcher = CustomEventDispatcher.getInstance()

  private playerGrid
  private enemyGrid

  monster1
  monster2

  init() {
    this.accessThirdDimension()
    this.setScene()
  }

  create() {
    // creates a nice scene
    this.third.warpSpeed('-orbitControls', '-grid', '-lookAtCenter', '-ground')
    this.third.camera.translateX(4.200205939552442)
    this.third.camera.translateY(-5.13945596907)
    this.third.camera.translateZ(-2.95216046263)

    this.third.camera.setRotationFromEuler(
      new THREE.Euler(-0.4963543842116094, 0.3508399919982686, 0.18402730777738688)
    )
    this.third.camera

    setInterval(() => {
      const { camera } = this.third
      console.log(camera.position)
      console.log(camera.rotation)
    }, 2000)

    this.third.load.preload('grass', '/assets/materials/grass.jpg')
    this.third.load.texture('grass').then((grass) => {
      grass.wrapS = grass.wrapT = 3 // RepeatWrapping
      grass.offset.set(0, 0)
      grass.repeat.set(50, 50)

      // BUG: To add shadows to your ground, set transparent = true
      this.third.physics.add.ground({ width: 20, height: 20, y: 0 }, { phong: { map: grass, transparent: true } })
      this.EventDispatcher.emit(CustomEvents.INIT_CHAT_UI)
    })
  }

  async setScene() {
    const { EventDispatcher } = this
    try {
      this.playerGrid = [
        [new GridSpot(1, this, { x: 3.45, y: 0.51, z: 8.4 }), new GridSpot(1, this, { x: 3.45, y: 0.51, z: 8.6 })],
        [new GridSpot(1, this, { x: 3.7, y: 0.51, z: 8.4 }), new GridSpot(1, this, { x: 3.7, y: 0.51, z: 8.6 })],
        [(new GridSpot(1, this, { x: 3.95, y: 0.51, z: 8.4 }), new GridSpot(1, this, { x: 3.95, y: 0.51, z: 8.6 }))]
      ]
      this.enemyGrid = [
        [new GridSpot(2, this, { x: 3.95, y: 0.51, z: 7.8 }), new GridSpot(2, this, { x: 3.95, y: 0.51, z: 7.6 })],
        [new GridSpot(2, this, { x: 3.7, y: 0.51, z: 7.8 }), new GridSpot(2, this, { x: 3.7, y: 0.51, z: 7.6 })],
        [new GridSpot(2, this, { x: 3.45, y: 0.51, z: 7.8 }), new GridSpot(2, this, { x: 3.45, y: 0.51, z: 7.6 })]
      ]

      this.createMonsterSprite(charizard, this.playerGrid[1][0]).then((monster) => {
        this.monster1 = monster
        EventDispatcher.emit(CustomEvents.RENDER_MONSTER_PLATE, {
          monster: monster,
          camera: this.third.camera,
          canvas: this.third.renderer.domElement
        })
      })

      this.createMonsterSprite(blastoise, this.enemyGrid[1][0]).then((monster) => {
        this.monster2 = monster
        EventDispatcher.emit(CustomEvents.RENDER_MONSTER_PLATE, {
          monster: monster,
          camera: this.third.camera,
          canvas: this.third.renderer.domElement
        })
      })
    } finally {
      EventDispatcher.emit(CustomEvents.INIT_BATTLE_UI)
    }
  }

  update() {
    //ui events
    if (this.monster1) {
    }
  }

  //TODO: eventually move this to be a method of Monster
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
    const spritePath = grid.getPlayer() === 1 ? backSpritePath : frontSpritePath
    const sizes = grid.getPlayer() === 1 ? { width: 98, height: 83 } : { width: 89, height: 91 }
    const texture = await this.third.load.texture(spritePath)

    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter

    const mon = new FLAT.SpriteSheet(texture, sizes)

    mon.anims.add('idle', { start: 0, end: 93, rate: 20 })
    mon.anims.add('run', { start: 8, end: 13, rate: 20 })
    mon.anims.add('jump', { timeline: [16, 17, 18, 19, 20, 21, 22, 23, 0], rate: 20, repeat: 1 })

    mon.anims.play('idle')

    mon.setScale(0.0025)
    const { x, y, z } = grid.getModel().position
    mon.position.set(x, y + 0.11, z)
    monster.setGameObject(mon)
    this.third.scene.add(mon)

    return monster
  }
}
