import { BoxConfig, MaterialConfig } from "@enable3d/common/dist/types";
import Third from "@enable3d/phaser-extension/dist/third";


type modelTypes = "mesh"| "material" | "extrude" | "existing" | "plane" | "ground" | "box" | "sphere" | "cylinder" | "cone" | "torus";


export function QuickModelInstance(scene, name, path, modelType: modelTypes, {boxConfig, materialConfig}: { boxConfig?: BoxConfig | undefined, materialConfig?: MaterialConfig | undefined }) {
    scene.third.load.preload(name, path);
    scene.third.load.texture('spot').then(spot => {
        scene.third.add[modelType](boxConfig, materialConfig);
    });
}