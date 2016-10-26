/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/threejs/OBJMTLLoader.d.ts"/>
/// <reference path="../faceMap.ts"/>

class CubeView extends THREE.Mesh {
    objects: {name: string; onFace: THREE.Vector3; object: THREE.Object3D}[];
    pendingDownloads: number;

    constructor(size: number, color: number, posx: number, posy: number, posz: number, keys: THREE.Vector3[], coins: THREE.Vector3[], traps: THREE.Vector3[]) {
        var cubeGeometry = new THREE.BoxGeometry(size,size,size);
        var material = new THREE.MeshLambertMaterial({color: color, vertexColors: THREE.FaceColors});
        super(cubeGeometry,material);
        this.position.set(posx, posy, posz);

        //loading objects
        this.pendingDownloads = 0;
        this.objects = [];
        var loader = new THREE.OBJMTLLoader();

        //initializing the key objects
        for(var i=0;i<keys.length;i++) {
            this.pendingDownloads++;
            loader.load(
                'res/models/key/key.obj',
                'res/models/key/key.mtl',
                function (toFace: THREE.Vector3, object: THREE.Object3D) {
                    object.position.add(toFace.clone().multiplyScalar(0.6));
                    switch (Face.vectorToString(toFace)) {
                        case Face.s.bottom : object.rotateX(Math.PI); break;
                        case Face.s.rear : object.rotateX(-Math.PI/2); break;
                        case Face.s.front : object.rotateX(Math.PI/2); break;
                        case Face.s.left : object.rotateZ(-Math.PI/2); break;
                        case Face.s.right : object.rotateZ(Math.PI/2); break;
                    }
                    object.scale.set(0.01,0.01,0.01);
                    this.add(object);
                    this.objects.push({name: "key", onFace: toFace, object: object});
                    this.pendingDownloads--;
                }.bind(this, keys[i]),
                function(){},
                function(reason:any){
                    console.log("something went wrong during the loading of the key model");
                    this.pendingDownloads--;
                    console.log(reason);
                });
        }

        //initializing the coin objects
        for(i = 0; i< coins.length;i++) {
            this.pendingDownloads++;
            loader.load(
                'res/models/coin/coin.obj',
                'res/models/coin/coin.mtl',
                function (toFace: THREE.Vector3, object:THREE.Object3D) {
                    object.position.add(toFace.clone().multiplyScalar(0.8));
                    switch (Face.vectorToString(toFace)) {
                        case Face.s.bottom : object.rotateX(Math.PI); break;
                        case Face.s.rear : object.rotateX(-Math.PI / 2); break;
                        case Face.s.front : object.rotateX(Math.PI / 2); break;
                        case Face.s.left : object.rotateZ(-Math.PI / 2); break;
                        case Face.s.right : object.rotateZ(Math.PI / 2); break;
                    }
                    object.scale.set(0.01, 0.01, 0.01);
                    this.add(object);
                    this.objects.push({name: "coin", onFace: toFace, object: object});
                    this.pendingDownloads--;
                }.bind(this,coins[i]),
                function () {
                },
                function (reason: any) {
                    console.log("something went wrong during the loading of the key model");
                    this.pendingDownloads--;
                    console.log(reason);
                });
        }

        //initializing the trap objects
        for(i = 0; i< traps.length;i++) {
            this.pendingDownloads++;
            loader.load(
                'res/models/trap/trap.obj',
                'res/models/trap/trap.mtl',
                function (toFace: THREE.Vector3, object:THREE.Object3D) {
                    object.position.add(toFace.clone().multiplyScalar(0.55));
                    switch (Face.vectorToString(toFace)) {
                        case Face.s.bottom :object.rotateX(Math.PI);break;
                        case Face.s.rear :object.rotateX(-Math.PI/2);break;
                        case Face.s.front :object.rotateX(Math.PI/2);break;
                        case Face.s.left :object.rotateZ(-Math.PI/2);break;
                        case Face.s.right :object.rotateZ(Math.PI/2);break;
                    }
                    object.scale.set(0.015,0.015,0.015);
                    this.add(object);
                    this.objects.push({name: "trap", onFace: toFace, object: object});
                    this.pendingDownloads--;
                }.bind(this,traps[i]),
                function () {
                },
                function (reason: any) {
                    console.log("something went wrong during the loading of the key model");
                    this.pendingDownloads--;
                    console.log(reason);
                });
        }

    }

    paintFace(face:string, color: number) {
        var i: number,j : number;
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

    removeObject(fromFace: THREE.Vector3) {
        for(var i=0;i<this.objects.length;i++) {
            if(this.objects[i].onFace.equals(fromFace)) {
                this.remove(this.objects[i].object);
                this.objects.splice(i,1);
            }
        }
    }

    update(delta: number) {
        for(var i= 0;i<this.objects.length;i++) {
            if(this.objects[i].name !== "trap") {
                var rot = Math.PI * delta;
                switch (Face.vectorToString(this.objects[i].onFace)) {
                    case Face.s.top : this.objects[i].object.rotateY(rot); break;
                    case Face.s.bottom : this.objects[i].object.rotateY(rot); break;
                    case Face.s.rear : this.objects[i].object.rotateY(rot); break;
                    case Face.s.front : this.objects[i].object.rotateY(rot); break;
                    case Face.s.left : this.objects[i].object.rotateY(rot); break;
                    case Face.s.right : this.objects[i].object.rotateY(rot); break;
                }
            }
        }
    }
}
