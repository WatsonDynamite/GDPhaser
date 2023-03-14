import { GameObjects } from "phaser";
import { PlaneConfig } from "@enable3d/common/dist/types";
import { ExtendedObject3D, Scene3D, THREE } from '@enable3d/phaser-extension';
import Third from "@enable3d/phaser-extension/dist/third";
import MonsterGameObj from "./monsterGameObject";


export class GridSpot extends GameObjects.GameObject {
    private spotModel: ExtendedObject3D;
    private player: number;
    private monster: GameObjects.GameObject;
    private hazard: GameObjects.GameObject;
    third: Third;

    constructor(player: number, scene: Scene3D, config?: PlaneConfig | undefined) {
        super(scene, 'gridspot');
        this.player = player;
        scene.third.load.preload('spot', '/assets/sprites/spot.png');
        scene.third.load.texture('spot').then(spot => {
            spot.minFilter = THREE.NearestFilter;
            spot.magFilter = THREE.NearestFilter;

            const spotModel = scene.third.add.plane({width: 0.25, height: 0.25, ...config},  { phong: { map: spot, transparent: true } });
            spotModel.rotateX(1.5);
            this.spotModel = spotModel;
        });
    }

    public getModel() {
        return this.spotModel;
    }

    public getPlayer() {
        return this.player;
    }

    public setMonster(monster: MonsterGameObj){
        this.monster = monster;
    }

    public setHazard(hazard: GameObjects.GameObject) {
        this.hazard = hazard;
    }
}