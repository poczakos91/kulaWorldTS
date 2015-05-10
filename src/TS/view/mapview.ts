/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../model/cube.ts"/>

class MapView extends THREE.Object3D {
    constructor() {
        super();
    }

    appendChildrenFromModel(cubes: Cube[]) {
        for(var i=0;i<cubes.length;i++) {
            this.add(cubes[i].getView());
        }
    }
}