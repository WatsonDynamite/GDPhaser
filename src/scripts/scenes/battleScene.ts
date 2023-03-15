import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot'
import MonsterGameObj from '../../gameObjects/monsterGameObject'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'
import { Abilities } from '../definitions/ability'
import { Monster } from '../definitions/monster'
import { Moves } from '../definitions/move'
import { Type } from '../definitions/type'

import GifLoader from 'three-gif-loader'
import { AnimationClip } from 'three'

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'BattleScene' })
  }

  private EventDispatcher = CustomEventDispatcher.getInstance()

  private playerGrid
  private enemyGrid

  init() {
    this.accessThirdDimension()
    //CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CHAT_UI);
    this.playerGrid = [
      [new GridSpot(1, this, { x: 3.45, y: 0.51, z: 8.4 }), new GridSpot(1, this, { x: 3.7, y: 0.51, z: 8.4 })],
      [new GridSpot(1, this, { x: 3.95, y: 0.51, z: 8.4 }), new GridSpot(1, this, { x: 3.45, y: 0.51, z: 8.6 })],
      [new GridSpot(1, this, { x: 3.7, y: 0.51, z: 8.6 }), new GridSpot(1, this, { x: 3.95, y: 0.51, z: 8.6 })]
    ]
    this.enemyGrid = [
      [new GridSpot(2, this, { x: 3.45, y: 0.51, z: 7.6 }), new GridSpot(2, this, { x: 3.7, y: 0.51, z: 7.6 })],
      [new GridSpot(2, this, { x: 3.95, y: 0.51, z: 7.6 }), new GridSpot(2, this, { x: 3.45, y: 0.51, z: 7.8 })],
      [new GridSpot(2, this, { x: 3.7, y: 0.51, z: 7.8 }), new GridSpot(2, this, { x: 3.95, y: 0.51, z: 7.8 })]
    ]
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
    })

    this.setScene()
  }

  update() {
    //then your regular game code
  }

  async setScene() {
    const monster: Monster = new Monster(
      'charizard',
      { t1: Type.FIRE },
      100,
      100,
      100,
      100,
      100,
      100,
      { m1: Moves.testMove },
      Abilities.TEST,
      {
        frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.gif',
        backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.gif',
        backSpriteAtkPath: '/assets/sprites/monstersprites/charizard/charizard_b_atk.gif',
        frontSpriteAtkPath: '/assets/sprites/monstersprites/charizard/charizard_f_atk.gif'
      }
    )

    //const gameObj = new MonsterGameObj(self, monster, this.playerGrid[0][0]

    const gameObj = await this.createMonsterSprite(monster, this.playerGrid[0][0])
    monster.SetGameObject(gameObj)

    //this.third.scene3D.add.
    //console.log(gameObj)
    //console.log(gameObj.getModel());
    //console.log(gameObj)
  }

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
}
