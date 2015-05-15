/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class Lighting {
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    directionLight: THREE.DirectionalLight;

    constructor(scene: THREE.Scene) {
        this.pointLight1 = new THREE.PointLight(0xffffff);
        this.pointLight1.position.set(0, 10, 0);
        scene.add(this.pointLight1);
        this.pointLight2 = new THREE.PointLight(0xffffff);
        this.pointLight2.position.set(0, -10, 0);
        scene.add(this.pointLight2);

        this.ambientLight = new THREE.AmbientLight(0x0f0f0f);
        scene.add(this.ambientLight);

        this.directionLight = new THREE.DirectionalLight(0xffffff);
        this.directionLight.position.set(0, 10, 0);
        scene.add(this.directionLight);

    }
}