/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../view/cubeview.ts"/>

class Cube {
    id: number;
    position: THREE.Vector3;
    neighbours: any; //TODO csinálj egy neighbours típust (interfacet)
    view: CubeView;

    constructor(id: number, size: number, color: number, position: THREE.Vector3, neighbours: any) {
        this.id = id;
        this.position = position.clone();
        this.neighbours = neighbours;

        this.view = new CubeView(size, color, this.position.x*size, this.position.y*size, this.position.z*size);
    }

    getView(): CubeView {
        return this.view;
    }

    moveRequest(fromFace: string, direction: string, extraKeys?: number[]): any {
        for(var i= 0,size= this.neighbours.length;i<size;i++) {
            if(this.neighbours[i].fromFace === fromFace && this.neighbours[i].requiredDirection === direction) { //TODO do something with the special keys when you implement jump feature
                return {cubeID: this.neighbours[i].toCube, toFace: this.neighbours[i].toFace};
            }
        }
        return null;
    }
}
