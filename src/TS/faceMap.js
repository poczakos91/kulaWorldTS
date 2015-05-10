/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/5/2015.
 */
var Face;
(function (Face) {
    /**
     * s like string, face as a string
     */
    var s;
    (function (s) {
        s.top = "top";
        s.bottom = "bottom";
        s.left = "left";
        s.right = "right";
        s.front = "front";
        s.rear = "rear";
    })(s = Face.s || (Face.s = {}));
    /**
     * v like Vector, face as a Vector
     */
    var v;
    (function (v) {
        v.top = new THREE.Vector3(0, 1, 0);
        v.bottom = new THREE.Vector3(0, -1, 0);
        v.left = new THREE.Vector3(1, 0, 0);
        v.right = new THREE.Vector3(-1, 0, 0);
        v.front = new THREE.Vector3(0, 0, 1);
        v.rear = new THREE.Vector3(0, 0, -1);
    })(v = Face.v || (Face.v = {}));
    function stringToVector(face) {
        switch (face) {
            case s.top: return v.top.clone();
            case s.bottom: return v.bottom.clone();
            case s.left: return v.left.clone();
            case s.right: return v.right.clone();
            case s.front: return v.front.clone();
            case s.rear: return v.rear.clone();
        }
        throw "I can't make vector from string: " + face;
    }
    Face.stringToVector = stringToVector;
    function vectorToString(face) {
        if (face.x == 1)
            return s.left;
        if (face.x == -1)
            return s.right;
        if (face.y == 1)
            return s.top;
        if (face.y == -1)
            return s.bottom;
        if (face.z == 1)
            return s.front;
        if (face.z == -1)
            return s.rear;
        throw "I can't make string from vector: " + face.x + " " + face.y + " " + face.z;
    }
    Face.vectorToString = vectorToString;
})(Face || (Face = {}));
//# sourceMappingURL=faceMap.js.map