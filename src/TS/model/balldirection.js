/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../faceMap.ts"/>
var DirectionHandler = (function () {
    function DirectionHandler(startingFace, startingDirection) {
        this.actDirection = Direction.stringToVector(startingDirection);
        this.actFace = Face.stringToVector(startingFace);
        this.rollAxis = new THREE.Vector3();
        this.calculateRollAxis();
    }
    /**
     * Recalculates the ball direction and sets the new cube face
     * @param toFace - the new face
     * @param isOtherCube - true if the this.actFace and toFace are on different cubes, false otherwise
     */
    DirectionHandler.prototype.faceChanged = function (toFace, isOtherCube) {
        this.prevDirection = this.actDirection.clone();
        //if the faces are the same, there's no direction change
        if (!this.actFace.equals(toFace)) {
            //if the faceChange is between two different cubes, than the previous face vector will be the direction
            if (isOtherCube) {
                this.actDirection.set(this.actFace.x, this.actFace.y, this.actFace.z);
                this.actFace.set(toFace.x, toFace.y, toFace.z);
            }
            else {
                this.actDirection.set(-this.actFace.x, -this.actFace.y, -this.actFace.z);
                this.actFace.set(toFace.x, toFace.y, toFace.z);
            }
        }
    };
    /**
     * Rotates the actDirection vector with the given angle
     * @param angle
     */
    DirectionHandler.prototype.rotateDirection = function (angle) {
        this.actDirection.applyAxisAngle(this.actFace, angle);
    };
    /**
     * Calculates the rotation vector of the rolling ball
     */
    DirectionHandler.prototype.calculateRollAxis = function () {
        this.rollAxis.crossVectors(this.actFace, this.actDirection);
        this.rollAxis.round();
    };
    return DirectionHandler;
})();
//# sourceMappingURL=balldirection.js.map