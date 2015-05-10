/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/5/2015.
 */

module Direction {
    export module s {
        export var up = "up";
        export var down = "down";
        export var left = "left";
        export var right = "right";
        export var forward = "forward";
        export var backward = "backward";
    }
    export module v {
        export var up = new THREE.Vector3(0,1,0);
        export var down = new THREE.Vector3(0,-1,0);
        export var left = new THREE.Vector3(1,0,0);
        export var right = new THREE.Vector3(-1,0,0);
        export var forward = new THREE.Vector3(0,0,1);
        export var backward = new THREE.Vector3(0,0,-1);
    }

    export function stringToVector(dir: string): THREE.Vector3 {
        switch (dir) {
            case s.up: return v.up.clone();
            case s.down: return v.down.clone();
            case s.left: return v.left.clone();
            case s.right: return v.right.clone();
            case s.forward: return v.forward.clone();
            case s.backward: return v.backward.clone();
        }
        throw "I can't make vector from string: "+dir;
    }

    export function vectorToString(dir: THREE.Vector3): string {
        if(dir.x == 1) return s.left;
        if(dir.x == -1) return s.right;
        if(dir.y == 1) return s.up;
        if(dir.y == -1) return s.down;
        if(dir.z == 1) return s.forward;
        if(dir.z == -1) return s.backward;

        throw "I can't make string from vector: "+dir.x+" "+dir.y+" "+dir.z;
    }
}