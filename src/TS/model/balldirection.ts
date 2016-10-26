/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../faceMap.ts"/>

class DirectionHandler {
    prevDirection: THREE.Vector3;
    actDirection: THREE.Vector3;
    actFace: THREE.Vector3;
    rollAxis: THREE.Vector3;

    constructor(startingFace: string, startingDirection: string) {
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
    faceChanged(toFace: THREE.Vector3, isOtherCube: boolean) {
        this.prevDirection = this.actDirection.clone();
        //if the faces are the same, there's no direction change
        if(!this.actFace.equals(toFace)) {
            //if the faceChange is between two different cubes, than the previous face vector will be the direction
            if(isOtherCube) {
                this.actDirection.set(this.actFace.x, this.actFace.y, this.actFace.z);
                this.actFace.set(toFace.x, toFace.y, toFace.z);
            }
            //if the faceChange is on the same cube, than the previous face vector multiply -1 will be the direction
            else {
                this.actDirection.set(-this.actFace.x, -this.actFace.y, -this.actFace.z);
                this.actFace.set(toFace.x, toFace.y, toFace.z);
            }
        }
    }

    /**
     * Rotates the actDirection vector with the given angle
     * @param angle
     */
    rotateDirection(angle: number) {
        this.actDirection.applyAxisAngle(this.actFace,angle);
    }

    /**
     * Calculates the rotation vector of the rolling ball
     */
    calculateRollAxis() {
        this.rollAxis.crossVectors(this.actFace, this.actDirection);
        this.rollAxis.round();
    }
}
