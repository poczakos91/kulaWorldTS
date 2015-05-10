/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class Space {
    /* stars: THREE.PointCloud;
     planets: THREE.Mesh[];*/

    constructor(scene:THREE.Scene) {
        for(var i=0;i<3;i++) {
            scene.add(this.createStars());
        }
        var mars = this.createPlanet(new THREE.SphereGeometry(30, 20, 20), "res/img/mars.png", "res/img/marsBump.png");
        mars.position.set(-20, 0, 100);
        scene.add(mars);
    }

    createPlanet(geom:THREE.SphereGeometry, textureSource:string, bumpMapSource?:string):THREE.Object3D {
        var planetTexture = THREE.ImageUtils.loadTexture(textureSource);
        var planetMaterial:THREE.MeshLambertMaterial;
        if (bumpMapSource) {
            var planetBumpMap = THREE.ImageUtils.loadTexture(bumpMapSource);
            planetMaterial = new THREE.MeshLambertMaterial({
                map: planetTexture,
                bumpMap: planetBumpMap
            });
        }
        else {
            planetMaterial = new THREE.MeshPhongMaterial({map: planetTexture});
        }

        return new THREE.Mesh(geom, planetMaterial);
    }

    createStars():THREE.PointCloud {
        var geometry:THREE.Geometry = new THREE.Geometry();
        var material:THREE.PointCloudMaterial = new THREE.PointCloudMaterial({
            size: Math.random()*4,
            transparent: true,
            sizeAttenuation: true,
            opacity: Math.random()
        });
        var range = 400;
        var sideLength = range * 2;
        var starDensity = 500;
        var randX, randY;
        var color = new THREE.Color(0xffffff);
        //front
        for (var i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, randY, range));
            geometry.colors.push(color);
        }
        //back
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, randY, -range));
            geometry.colors.push(color);
        }
        //leftSide
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(range, randX, randY));
            geometry.colors.push(color);
        }
        //rightSide
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(-range, randX, randY));
            geometry.colors.push(color);
        }
        //top
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, range, randY));
            geometry.colors.push(color);
        }
        //bottom
        for (i = 0; i < starDensity; i++) {
            randX = (Math.random() - 0.5) * sideLength;
            randY = (Math.random() - 0.5) * sideLength;
            geometry.vertices.push(new THREE.Vector3(randX, -range, randY));
            geometry.colors.push(color);
        }
        return new THREE.PointCloud(geometry, material);
    }

}