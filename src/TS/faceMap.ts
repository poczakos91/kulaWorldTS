/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/5/2015.
 */

module Face {
    /**
     * s like string, face as a string
     */
    export module s {
        export var top = "top";
        export var bottom = "bottom";
        export var left = "left";
        export var right = "right";
        export var front = "front";
        export var rear = "rear";
    }

    /**
     * v like Vector, face as a Vector
     */
    export module v {
        export var top = new THREE.Vector3(0,1,0);
        export var bottom = new THREE.Vector3(0,-1,0);
        export var left = new THREE.Vector3(1,0,0);
        export var right = new THREE.Vector3(-1,0,0);
        export var front = new THREE.Vector3(0,0,1);
        export var rear = new THREE.Vector3(0,0,-1);
    }

    export function stringToVector(face: string) {
        switch (face) {
            case s.top: return v.top.clone();
            case s.bottom: return v.bottom.clone();
            case s.left: return v.left.clone();
            case s.right: return v.right.clone();
            case s.front: return v.front.clone();
            case s.rear: return v.rear.clone();
        }
        throw "I can't make vector from string: "+face;
    }

    export function vectorToString(face: THREE.Vector3) {
        if(face.x == 1) return s.left;
        if(face.x == -1) return s.right;
        if(face.y == 1) return s.top;
        if(face.y == -1) return s.bottom;
        if(face.z == 1) return s.front;
        if(face.z == -1) return s.rear;

        throw "I can't make string from vector: "+face.x+" "+face.y+" "+face.z;
    }
}