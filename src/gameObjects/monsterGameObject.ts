import { GameObjects } from 'phaser'
import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import { PlaneConfig } from '@enable3d/common/dist/types'
import { Monster } from '../scripts/definitions/monster'
import { GridSpot } from './gridSpot'

export default class MonsterGameObj extends GameObjects.GameObject {
  public sprite: FLAT.SpriteSheet

  public getModel() {
    return this.sprite
  }

  constructor(scene: Scene3D, monster: Monster, grid: GridSpot) {
    super(scene, 'monsterobj')
    const {
      sprites: { frontSpritePath, backSpritePath }
    } = monster
    const spritePath = grid.getPlayer() === 1 ? backSpritePath : frontSpritePath

    //const map = new THREE.TextureLoader().load(spritePath)
    //const material = new THREE.SpriteMaterial({ map: map })

    scene.load.spritesheet(monster.name, spritePath, {
      frameWidth: 96,
      frameHeight: 96
    })

    //const sprite = new THREE.Sprite(material)
    var config: Phaser.Types.Animations.Animation = {
      key: 'idle',
      frames: scene.anims.generateFrameNumbers(monster.name, {
        start: 0,
        end: 8,
        first: 0
      }),
      frameRate: 10,
      repeat: -1,
      duration: 90
    }

    scene.anims.create(config)

    //scene.add.sprite(x, y, monster.name)

    //scene.third.load.preload(monster.name, spritePath);
    //scene.third.load.texture(monster.name).then(mon => {
    //    mon.minFilter = THREE.NearestFilter;
    //    mon.magFilter = THREE.NearestFilter;
    //
    //    const { x, y, z } = grid.getModel().position;
    //
    //    scene.third.add.plane({ width: 0.25, height: 0.25, x, y, z,},  { phong: { map: mon, transparent: true } }).rotateY(1.);
    //});
  }
}
