/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class Lighting {
    pointLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    directionLight: THREE.DirectionalLight;

    constructor(scene: THREE.Scene) {
        //this.pointLight = new THREE.PointLight(0xffffff);
        //this.pointLight.position.set(0, 10, 0);
        //scene.add(this.pointLight);

        this.ambientLight = new THREE.AmbientLight(0x0f0f0f);
        scene.add(this.ambientLight);

        this.directionLight = new THREE.DirectionalLight(0xffffff);
        this.directionLight.position.set(0, 10, 0);
        scene.add(this.directionLight);

    }
}