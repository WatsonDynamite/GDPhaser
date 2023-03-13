import { Scene3D } from '@enable3d/phaser-extension'

export default class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }
  
  private lastUpdateMoment = 0;
  private forcedUpdateMoment = 0;
  private isWaiting4ActualUpdateEvent = false;

  init() {
    this.accessThirdDimension()
  }

  create() {
    // creates a nice scene
    this.third.warpSpeed()

    // adds a box
    this.third.add.box({ x: 1, y: 2 })

    // adds a box with physics
    this.third.physics.add.box({ x: -1, y: 2 })

    // throws some random object on the scene
    this.third.haveSomeFun()
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
