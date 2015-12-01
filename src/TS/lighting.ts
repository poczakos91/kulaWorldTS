/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class Lighting {
    directionLight: THREE.DirectionalLight;

    constructor(scene: THREE.Scene) {
        var spotLight3 = new THREE.SpotLight(0xffffff);
        spotLight3.position.set(-10, -10, -10);
        spotLight3.lookAt(new THREE.Vector3());
        scene.add(spotLight3);
        var spotLight4 = new THREE.SpotLight(0xffffff);
        spotLight4.position.set(10, -10, 10);
        spotLight4.lookAt(new THREE.Vector3());
        scene.add(spotLight4);


        this.directionLight = new THREE.DirectionalLight(0xffffff);
        this.directionLight.position.set(0, 10, 0);
        scene.add(this.directionLight);

    }
}