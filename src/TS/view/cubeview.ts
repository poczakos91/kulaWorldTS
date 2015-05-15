/// <reference path="../../../libs/ts/threejs/three.d.ts"/>

class CubeView extends THREE.Mesh {
    constructor(size: number, color: number, posx: number, posy: number, posz: number) {
        var cubeGeometry = new THREE.BoxGeometry(size,size,size);
        var material = new THREE.MeshLambertMaterial({color: color, vertexColors: THREE.FaceColors});
        super(cubeGeometry,material);
        this.position.set(posx, posy, posz);
    }

    paintFace(face:string, color: number) {
        var i,j;
        switch (face) {
            case "top": i=4;j=5; break;
            case "bottom": i=6;j=7; break;
            case "left": i=0;j=1; break;
            case "right": i=2;j=3; break;
            case "front": i=8;j=9; break;
            case "rear": i=10;j=11;
        }
        this.geometry.faces[i].color.setHex(color);
        this.geometry.faces[j].color.setHex(color);

        this.geometry.colorsNeedUpdate = true;
    }
}
