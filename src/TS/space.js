/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */
var Space = (function () {
    /* stars: THREE.PointCloud;
     planets: THREE.Mesh[];*/
    function Space(scene) {
        for (var i = 0; i < 3; i++) {
            scene.add(this.createStars());
        }
        var mars = this.createPlanet(new THREE.SphereGeometry(30, 20, 20), "res/img/mars.png", "res/img/marsBump.png");
        mars.position.set(-20, 0, 100);
        scene.add(mars);
    }
    Space.prototype.createPlanet = function (geom, textureSource, bumpMapSource) {
        var planetTexture = THREE.ImageUtils.loadTexture(textureSource);
        var planetMaterial;
        if (bumpMapSource) {
            var planetBumpMap = THREE.ImageUtils.loadTexture(bumpMapSource);
            planetMaterial = new THREE.MeshLambertMaterial({
                map: planetTexture,
                bumpMap: planetBumpMap
            });
        }
        else {
            planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
        }
        return new THREE.Mesh(geom, planetMaterial);
    };
    Space.prototype.createStars = function () {
        var geometry = new THREE.Geometry();
        var material = new THREE.PointCloudMaterial({
            size: Math.random() * 4,
            transparent: true,
            sizeAttenuation: true,
            opacity: Math.random()
        });
        var range = 400;
        var sideLength = range * 2;
        var starDensity = 500;
        var randX, randY;
        var color = new THREE.Color(0xffffff);
        for (var i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, randY, range));
            geometry.colors.push(color);
        }
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, randY, -range));
            geometry.colors.push(color);
        }
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(range, randX, randY));
            geometry.colors.push(color);
        }
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(-range, randX, randY));
            geometry.colors.push(color);
        }
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, range, randY));
            geometry.colors.push(color);
        }
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, -range, randY));
            geometry.colors.push(color);
        }
        return new THREE.PointCloud(geometry, material);
    };
    return Space;
})();
//# sourceMappingURL=space.js.map