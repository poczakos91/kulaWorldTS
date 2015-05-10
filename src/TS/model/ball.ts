/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="cube.ts"/>
/// <reference path="map.ts"/>
/// <reference path="balldirection.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../camera/controls/firstpersoncontrol.ts"/>

class Ball {
    actCube: Cube;
    actFace: string;
    direction: DirectionHandler;
    map: MapModel;
    view: BallView;
    fpControl: FirstPersonControl;

    constructor(startingCube: Cube, startingFace: string, startingDirection: string, map: MapModel, fpControl: FirstPersonControl) {
        this.actCube = startingCube;
        this.actFace = startingFace;
        this.direction = new DirectionHandler(startingFace, startingDirection);
        this.map = map;
        this.fpControl = fpControl;
    }

    setView(view: BallView) {
        this.view = view;
        this.view.setPosition(this.actCube, this.actFace);
    }

    move() {
        if(!this.view.isAnimActive()) {
            var oldDirection: string = Direction.vectorToString(this.direction.actDirection);
            var newCube: {cubeID: number; toFace: string} = this.actCube.moveRequest(this.actFace, oldDirection);
            if(newCube) {
                var oldFace: THREE.Vector3 = Face.stringToVector(this.actFace);
                this.actFace = newCube.toFace;
                var oldCube: Cube = this.actCube;
                this.actCube = this.map.getCubeByID(newCube.cubeID);
                this.direction.faceChanged(this.actFace, (oldCube.id != this.actCube.id));

                var newFace: THREE.Vector3 = Face.stringToVector(this.actFace);
                var oldPos: THREE.Vector3 = oldCube.position.clone().add(oldFace.multiplyScalar(0.5+this.view.radius));
                var newPos: THREE.Vector3 = this.actCube.position.clone().add(newFace.multiplyScalar(0.5+this.view.radius));

                this.view.startMove(
                    oldPos,
                    newPos,
                    Direction.stringToVector(oldDirection),
                    this.direction.actDirection,
                    this.direction.rollAxis
                );
                this.fpControl.startMove(
                    oldFace,
                    Face.stringToVector(this.actFace),
                    newPos,
                    this.direction.actDirection,
                    this.view.path1Length/this.view.velocity1Length + this.view.path2Length/this.view.velocity2Length
                )
            }
            else {
                console.log("There's no possible place to move");
            }
        }
    }

    rotate(angle: number) {
        if(!this.view.isAnimActive()) {
            var oldDir = this.direction.actDirection.clone();
            this.direction.rotateDirection(angle);
            this.direction.calculateRollAxis();
            this.view.startRotate(Face.stringToVector(this.actFace), angle);

            this.fpControl.startRotation(angle, this.view.position, oldDir, Face.stringToVector(this.actFace));
        }
    }
}
