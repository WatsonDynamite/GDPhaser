import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot';
import MonsterGameObj from '../../gameObjects/monsterGameObject';
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher';
import { Abilities } from '../definitions/ability';
import { Monster } from '../definitions/monster';
import { Moves } from '../definitions/move';
import { Type } from '../definitions/type';
import Charizardb from 'src/assets/sprites/monstersprites/charizard_b.png';

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'BattleScene' })
  }
  
  private EventDispatcher = CustomEventDispatcher.getInstance();

  private playerGrid;
  private enemyGrid;

  init() {
    this.accessThirdDimension()
    //CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CHAT_UI);
    this.playerGrid = [
      [new GridSpot(1, this, {  x: 3.45, y: 0.51, z: 8.4 } ), new GridSpot(1, this, {  x: 3.70, y: 0.51, z: 8.4 } )],
      [new GridSpot(1, this, {  x: 3.95, y: 0.51, z: 8.4 } ), new GridSpot(1, this, {  x: 3.45, y: 0.51, z: 8.60 } )],
      [new GridSpot(1, this, {  x: 3.70, y: 0.51, z: 8.60 }), new GridSpot(1, this, {  x: 3.95, y: 0.51, z: 8.60 } )]
    ]
    this.enemyGrid =  [
      [new GridSpot(2, this, {  x: 3.45, y: 0.51, z: 7.6 } ), new GridSpot(2, this, {  x: 3.70, y: 0.51, z: 7.6 } )],
      [new GridSpot(2, this, {  x: 3.95, y: 0.51, z: 7.6 } ), new GridSpot(2, this, {  x: 3.45, y: 0.51, z: 7.80 } )],
      [new GridSpot(2, this, {  x: 3.70, y: 0.51, z: 7.80 } ), new GridSpot(2, this, {  x: 3.95, y: 0.51, z: 7.80 } )]
    ];
  }

  create() {
    // creates a nice scene
    this.third.warpSpeed( '-orbitControls', '-grid', '-lookAtCenter', '-ground');
    this.third.camera.translateX(4.2);
    this.third.camera.translateZ(-2.8);
    this.third.camera.translateY(-5.2);
    this.third.camera.rotateY(0.4);
    this.third.camera.rotateX(-0.3);

    this.third.load.preload('grass', '/assets/materials/grass.jpg');
    this.third.load.texture('grass').then(grass => {
      grass.wrapS = grass.wrapT = 3 // RepeatWrapping
      grass.offset.set(0, 0)
      grass.repeat.set(50, 50)
      this.scene.add

      // BUG: To add shadows to your ground, set transparent = true
      this.third.physics.add.ground({ width: 20, height: 20,  y: 0 }, { phong: { map: grass, transparent: true } });
    });

    const monster: Monster = new Monster(
      "charizard", 
      { t1: Type.FIRE }, 
      100, 100, 100, 100, 100, 100, 
      { m1: Moves.testMove }, 
      Abilities.TEST, 
      { 
        frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.png',
        backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png'
      });

    const gameObj = new MonsterGameObj(this, monster, this.playerGrid[0][0]);

    //this.third.scene3D.add.
    //console.log(gameObj)
    //console.log(gameObj.getModel());
    //console.log(gameObj)
  }


  update(){
    //then your regular game code
  }
}
