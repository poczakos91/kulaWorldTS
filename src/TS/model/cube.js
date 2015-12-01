/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>
/// <reference path="../model/map.ts"/>
var Cube = (function () {
    function Cube(id, size, color, position, map) {
        this.id = id;
        this.position = position.clone();
        this.map = map;
        this.view = new CubeView(size, color, this.position.x * size, this.position.y * size, this.position.z * size);
    }
    Cube.prototype.getView = function () {
        return this.view;
    };
    Cube.prototype.moveRequest = function (fromFace, direction, extraKeys) {
        var fromFaceAsVector = Face.stringToVector(fromFace);
        //testing the trivial movement (Has the cube a neighbour where "direction" points?)
        var possiblePosition = this.position.clone().add(direction);
        var newCube = this.map.getCubeByPosition(possiblePosition);
        if (newCube != null && newCube.isFaceReachable(fromFaceAsVector)) {
            return { cubeID: newCube.id, toFace: fromFace };
        }
        //testing the cube above the trivial movement (which position is: actPos + direction + fromFace)
        possiblePosition = this.position.clone().add(direction).add(fromFaceAsVector);
        newCube = this.map.getCubeByPosition(possiblePosition);
        if (newCube !== null) {
            if (this.hasSideNeighbours(fromFaceAsVector, direction) && newCube.hasSideNeighbours(fromFaceAsVector, direction)) {
                return null;
            }
            return { cubeID: newCube.id, toFace: Face.vectorToString(direction.clone().multiplyScalar(-1)) };
        }
        //testing that case when there is no cube in "direction" (the ball rolls on an other side of the same cube (if possible))
        if (!this.hasSideNeighbours(fromFaceAsVector, direction)) {
            return { cubeID: this.id, toFace: Face.vectorToString(direction) };
        }
        return null;
    };
    Cube.prototype.isFaceReachable = function (face) {
        var neighbourCube = this.map.getCubeByPosition(this.position.x + face.x, this.position.y + face.y, this.position.z + face.z);
        return (neighbourCube === null);
    };
    Cube.prototype.hasSideNeighbours = function (fromFace, toDirection) {
        var leftSide = new THREE.Vector3;
        leftSide.crossVectors(fromFace, toDirection);
        Direction.correct(leftSide);
        var leftCube = this.map.getCubeByPosition(this.position.x + leftSide.x, this.position.y + leftSide.y, this.position.z + leftSide.z);
        if (leftCube !== null) {
            return true;
        }
        var rightSide = leftSide.multiplyScalar(-1);
        var rightCube = this.map.getCubeByPosition(this.position.x + rightSide.x, this.position.y + rightSide.y, this.position.z + rightSide.z);
        if (rightCube !== null) {
            return true;
        }
        return false;
    };
    return Cube;
})();
//# sourceMappingURL=cube.js.map