import { GameObjects } from "phaser";
import { FLAT, Scene3D, THREE } from '@enable3d/phaser-extension';
import { PlaneConfig } from "@enable3d/common/dist/types";
import { Monster } from "../scripts/definitions/monster";
import { GridSpot } from "./gridSpot";

export default class MonsterGameObj extends GameObjects.GameObject {
    public sprite: FLAT.SpriteSheet;

    public getModel() {
        return this.sprite;
    }

    constructor(scene: Scene3D,  monster: Monster, grid: GridSpot) {
        super(scene, 'monsterobj');
        const { sprites: { frontSpritePath, backSpritePath} } = monster;
        const spritePath = grid.getPlayer() === 1 ? backSpritePath : frontSpritePath;
        scene.third.load.preload(monster.name, spritePath);
        scene.third.load.texture(monster.name).then(mon => {
            mon.minFilter = THREE.NearestFilter;
            mon.magFilter = THREE.NearestFilter;

            const { x, y, z } = grid.getModel().position;

            scene.third.add.plane({ width: 0.25, height: 0.25, x, y, z,},  { phong: { map: mon, transparent: true } }).rotateY(1.);
        });
    }
}