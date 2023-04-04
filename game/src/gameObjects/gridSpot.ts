import { GameObjects } from 'phaser'
import { PlaneConfig } from '@enable3d/common/dist/types'
import { ExtendedObject3D, Scene3D, THREE } from '@enable3d/phaser-extension'
import Third from '@enable3d/phaser-extension/dist/third'
import MonsterGameObj from './monsterGameObject'
import { Monster } from '../scripts/definitions/monster'

export class GridSpot extends GameObjects.GameObject {
  public spotModel: ExtendedObject3D
  private meta: {
    player: number
    position: 'front' | 'back'
  }
  private monster: Monster | null
  private hazard: GameObjects.GameObject
  third: Third

  constructor(player: number, position: 'front' | 'back', scene: Scene3D, config?: PlaneConfig | undefined) {
    super(scene, 'gridspot')
    this.meta = {
      player,
      position
    }
    scene.third.load.preload('spot', '/assets/sprites/spot.png')
    scene.third.load.texture('spot').then((spot) => {
      spot.minFilter = THREE.NearestFilter
      spot.magFilter = THREE.NearestFilter

      const spotModel = scene.third.add.plane(
        { width: 0.25, height: 0.25, ...config },
        { phong: { map: spot, transparent: true } }
      )
      spotModel.rotateX(1.5)
      this.spotModel = spotModel
    })
  }

  public getModel() {
    return this.spotModel
  }

  public getPlayer() {
    return this.meta.player
  }

  public getPosition() {
    return this.meta.position
  }

  public setMonster(monster: Monster) {
    this.monster = monster
    monster.setGridSpot(this)
  }

  public setHazard(hazard: GameObjects.GameObject) {
    this.hazard = hazard
  }

  public getMonster() {
    return this.monster
  }
}
