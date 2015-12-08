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
    Cube.prototype.moveRequest = function (fromFace, direction) {
        //testing the trivial movement (Has the cube a neighbour where "direction" points?)
        var possiblePosition = this.position.clone().add(direction);
        var newCube = this.map.getCubeByPosition(possiblePosition);
        if (newCube != null && newCube.isFaceReachable(fromFace)) {
            return { object: newCube, toFace: fromFace };
        }
        //testing the cube above the trivial movement (which position is: actPos + direction + fromFace)
        possiblePosition = this.position.clone().add(direction).add(fromFace);
        newCube = this.map.getCubeByPosition(possiblePosition);
        if (newCube !== null) {
            if (this.hasSideNeighbours(fromFace, direction) && newCube.hasSideNeighbours(fromFace, direction)) {
                return null;
            }
            return { object: newCube, toFace: direction.clone().multiplyScalar(-1) };
        }
        //testing that case when there is no cube in "direction" (the ball rolls on an other side of the same cube (if possible))
        if (!this.hasSideNeighbours(fromFace, direction)) {
            return { object: this, toFace: direction };
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
    /**
     * Finds the cube to jump to.
     * @param fromFace - the starting cube's face on that the ball is
     * @param viewDir - the ball's view direction
     * @returns {Cube}
     */
    Cube.prototype.jumpRequest = function (fromFace, viewDir) {
        //searching for obstacles which can stop the jump action between the starting position and the target position
        var possibleObstacle1, possibleObstacle2;
        possibleObstacle1 = this.map.getCubeByPosition(this.position.clone().add(fromFace).add(viewDir));
        possibleObstacle2 = this.map.getCubeByPosition(this.position.clone().add(fromFace.clone().multiplyScalar(2).add(viewDir)));
        if (possibleObstacle1 || possibleObstacle2)
            return null;
        //searching for obstacles above the target position
        possibleObstacle1 = this.map.getCubeByPosition(this.position.clone().add(fromFace).add(viewDir.clone().multiplyScalar(2)));
        if (possibleObstacle1)
            return null;
        //searching for cubes on those the ball can jump at
        var tempPos = this.position.clone().add(viewDir.clone().multiplyScalar(2));
        var dimIndex1, dimValue1, dimIndex2, dimValue2, dimIndexMain, dimValueMain;
        for (var i = 0; i < 3; i++) {
            if (fromFace.getComponent(i)) {
                dimIndexMain = i;
                dimValueMain = tempPos.getComponent(i);
                dimIndex1 = (i + 1) % 3;
                dimValue1 = tempPos.getComponent(dimIndex1);
                dimIndex2 = (i + 2) % 3;
                dimValue2 = tempPos.getComponent(dimIndex2);
                break;
            }
        }
        var possibleCubes = this.map.getCubesFromALine(dimIndex1, dimValue1, dimIndex2, dimValue2);
        var targetCube = null;
        var targetDistance = 5000;
        for (i = 0; i < possibleCubes.length; i++) {
            var tempDistance = Math.abs(possibleCubes[i].position.getComponent(dimIndexMain) - dimValueMain);
            var someThing = tempPos.clone().sub(fromFace.clone().multiplyScalar(tempDistance));
            if (tempDistance < targetDistance && possibleCubes[i].position.equals(someThing)) {
                targetCube = possibleCubes[i];
                targetDistance = tempDistance;
            }
        }
        return targetCube;
    };
    return Cube;
})();
//# sourceMappingURL=cube.js.map