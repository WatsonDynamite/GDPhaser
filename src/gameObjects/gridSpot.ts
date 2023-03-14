import { GameObjects } from "phaser";
import { PlaneConfig } from "@enable3d/common/dist/types";
import { ExtendedObject3D, Scene3D, THREE } from '@enable3d/phaser-extension';
import Third from "@enable3d/phaser-extension/dist/third";


export class GridSpot extends GameObjects.GameObject {
    public spotModel: ExtendedObject3D;
    private player: number;
    third: Third;

    constructor(player: number, scene: Scene3D, config?: PlaneConfig | undefined) {
        super(scene, 'gridspot');
        this.player = player;
        scene.third.load.preload('spot', '/assets/sprites/spot.png');
        scene.third.load.texture('spot').then(spot => {
            spot.minFilter = THREE.NearestFilter;
            spot.magFilter = THREE.NearestFilter;

            scene.third.add.plane(config,  { phong: { map: spot, transparent: true } }).rotateX(1.5);
        });
    }

    public getPlayer() {
        return this.player;
    }
}