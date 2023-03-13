import { Scene3D } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot';
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher';

export default class BattleScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }
  
  private lastUpdateMoment = 0;
  private forcedUpdateMoment = 0;
  private isWaiting4ActualUpdateEvent = false;
  private Emitter = CustomEventDispatcher.getInstance();

  init() {
    this.accessThirdDimension()
    CustomEventDispatcher.getInstance().emit(CustomEvents.INIT_CHAT_UI);
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

      // BUG: To add shadows to your ground, set transparent = true
      this.third.physics.add.ground({ width: 20, height: 20,  y: 0 }, { phong: { map: grass, transparent: true } });
    });
    
    const grid1f_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.45, y: 0.51, z: 8.4 } );
    const grid2f_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.70, y: 0.51, z: 8.4 } );
    const grid3f_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.95, y: 0.51, z: 8.4 } );
    const grid1b_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.45, y: 0.51, z: 8.60 } );
    const grid2b_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.70, y: 0.51, z: 8.60 } );
    const grid3b_1 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.95, y: 0.51, z: 8.60 } );

    const grid1f_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.45, y: 0.51, z: 7.4 } );
    const grid2f_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.70, y: 0.51, z: 7.4 } );
    const grid3f_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.95, y: 0.51, z: 7.4 } );
    const grid1b_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.45, y: 0.51, z: 7.60 } );
    const grid2b_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.70, y: 0.51, z: 7.60 } );
    const grid3b_2 = new GridSpot(this, { width: 0.25, height: 0.25,  x: 3.95, y: 0.51, z: 7.60 } );

  }

  update(t, dt){
    this.lastUpdateMoment = t;
	  if (this.isWaiting4ActualUpdateEvent){
        this.forcedUpdateMoment = this.lastUpdateMoment;
        this.isWaiting4ActualUpdateEvent = false;
    }
    //then your regular game code
  }

  awayUpdate(){
    if (this.lastUpdateMoment>this.forcedUpdateMoment+5000){
      this.forcedUpdateMoment = this.lastUpdateMoment
  	} else {
      this.update(this.forcedUpdateMoment+10000, 10000)
      this.forcedUpdateMoment = this.lastUpdateMoment;
    }
  }
}
