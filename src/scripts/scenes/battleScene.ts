import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot'
import MonsterGameObj from '../../gameObjects/monsterGameObject'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { Abilities } from '../definitions/ability'
import { Monster } from '../definitions/monster'
import { Moves } from '../definitions/move'
import { Type } from '../definitions/type'

import GifLoader from 'three-gif-loader'
import { AnimationClip, Vector3 } from 'three'
import { blastoise, charizard } from '../data/monsterList'
import { getScreenPositionFromWorldSpace } from '../../utils'

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

    CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_REACT_CANVAS)
    //
    this.setScene()
  }

  create() {
    // creates a nice scene
    this.third.warpSpeed('-orbitControls', '-grid', '-lookAtCenter', '-ground')
    this.third.camera.translateX(4.2)
    this.third.camera.translateZ(-2.8)
    this.third.camera.translateY(-5.2)
    this.third.camera.rotateY(0.4)
    this.third.camera.rotateX(-0.3)

    this.third.load.preload('grass', '/assets/materials/grass.jpg')
    this.third.load.texture('grass').then((grass) => {
      grass.wrapS = grass.wrapT = 3 // RepeatWrapping
      grass.offset.set(0, 0)
      grass.repeat.set(50, 50)

      // BUG: To add shadows to your ground, set transparent = true
      this.third.physics.add.ground({ width: 20, height: 20, y: 0 }, { phong: { map: grass, transparent: true } })
      CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CHAT_UI)
    })
  }

  async setScene() {
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

    this.monster1 = await this.createMonsterSprite(charizard, this.enemyGrid[1][0])
    this.monster2 = await this.createMonsterSprite(blastoise, this.playerGrid[1][0])
    console.log(
      getScreenPositionFromWorldSpace(
        this.monster1.getGameObject().position,
        this.third.camera,
        this.third.renderer.domElement
      )
    )
  }

  update() {
    //ui events
    if (this.monster1) {
      CustomEventDispatcher.getInstance().emit(CustomEvents.RENDER_MONSTER_PLATE, {
        monster: this.monster1,
        position: getScreenPositionFromWorldSpace(
          this.monster1.getGameObject().position,
          this.third.camera,
          this.third.renderer.domElement
        )
      })
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

    mon.setScale(0.003)
    const { x, y, z } = grid.getModel().position
    mon.position.set(x, y + 0.13, z)
    monster.setGameObject(mon)
    this.third.scene.add(mon)

    return monster
  }

  /*
  async createMonsterSprite(monster: Monster, grid: GridSpot) {
    const loader = new GifLoader()
    const {
      sprites: { frontSpritePath, backSpritePath }
    } = monster
    const gridModel = grid.getModel()
    const spritePath = grid.getPlayer() === 1 ? backSpritePath : frontSpritePath

    const map = new THREE.TextureLoader().load(spritePath)
    const material = new THREE.SpriteMaterial({ map: map })

    const sprite = new THREE.Sprite(material)
    //sprite.position.set(3.7, 0.51, 8.4)
    //this.third.scene.add(sprite)

    const texture = loader.load(spritePath)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    //const newSprite = new THREE.Plane(newMat)
    //newSprite.position.set(3.7, 0.51, 8.4)
    //this.third.scene.add(newSprite)

    const obj = this.third.add.plane(
      { width: 0.25, height: 0.25, x: 3.45, y: 0.63, z: 8.4 },
      { phong: { map: texture, transparent: true } }
    )

    const anim = new AnimationClip()

    obj.rotateY(0.42)
    this.third.scene.add(obj)
    console.log(obj.animations)

    return sprite
  }
  */
}
