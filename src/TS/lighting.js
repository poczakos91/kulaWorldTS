/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */
var Lighting = (function () {
    function Lighting(scene) {
        var spotLight2 = new THREE.SpotLight(0xffffff);
        spotLight2.position.set(-10, -10, -10);
        spotLight2.lookAt(new THREE.Vector3());
        scene.add(spotLight2);
        var spotLight3 = new THREE.SpotLight(0xffffff);
        spotLight3.position.set(10, -10, 10);
        spotLight3.lookAt(new THREE.Vector3());
        scene.add(spotLight3);
        this.directionLight = new THREE.DirectionalLight(0xffffff);
        this.directionLight.position.set(0, 10, 0);
        scene.add(this.directionLight);
    }
    return Lighting;
})();
//# sourceMappingURL=lighting.js.map