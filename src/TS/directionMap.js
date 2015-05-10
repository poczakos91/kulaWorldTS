/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/5/2015.
 */
var Direction;
(function (Direction) {
    var s;
    (function (s) {
        s.up = "up";
        s.down = "down";
        s.left = "left";
        s.right = "right";
        s.forward = "forward";
        s.backward = "backward";
    })(s = Direction.s || (Direction.s = {}));
    var v;
    (function (v) {
        v.up = new THREE.Vector3(0, 1, 0);
        v.down = new THREE.Vector3(0, -1, 0);
        v.left = new THREE.Vector3(1, 0, 0);
        v.right = new THREE.Vector3(-1, 0, 0);
        v.forward = new THREE.Vector3(0, 0, 1);
        v.backward = new THREE.Vector3(0, 0, -1);
    })(v = Direction.v || (Direction.v = {}));
    function stringToVector(dir) {
        switch (dir) {
            case s.up: return v.up.clone();
            case s.down: return v.down.clone();
            case s.left: return v.left.clone();
            case s.right: return v.right.clone();
            case s.forward: return v.forward.clone();
            case s.backward: return v.backward.clone();
        }
        throw "I can't make vector from string: " + dir;
    }
    Direction.stringToVector = stringToVector;
    function vectorToString(dir) {
        if (dir.x == 1)
            return s.left;
        if (dir.x == -1)
            return s.right;
        if (dir.y == 1)
            return s.up;
        if (dir.y == -1)
            return s.down;
        if (dir.z == 1)
            return s.forward;
        if (dir.z == -1)
            return s.backward;
        throw "I can't make string from vector: " + dir.x + " " + dir.y + " " + dir.z;
    }
    Direction.vectorToString = vectorToString;
})(Direction || (Direction = {}));
//# sourceMappingURL=directionMap.js.map