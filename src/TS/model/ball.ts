/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="cube.ts"/>
/// <reference path="map.ts"/>
/// <reference path="balldirection.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../camera/controls/firstpersoncontrol.ts"/>

class Ball {
    actCube: Cube;
    prevCube: Cube;
    actFace: THREE.Vector3;
    prevFace: THREE.Vector3;
    direction: DirectionHandler;
    view: BallView;
    fpControl: FirstPersonControl;

    constructor(startingCube: Cube, startingFace: string, startingDirection: string,/* map: MapModel,*/ fpControl: FirstPersonControl) {
        this.actCube = startingCube;
        this.actFace = Face.v[startingFace];
        this.prevFace = Face.v[startingFace];
        this.direction = new DirectionHandler(startingFace, startingDirection);
        //this.map = map;
        this.fpControl = fpControl;
    }

    setView(view: BallView) {
        this.view = view;
        this.view.setPosition(this.actCube, this.actFace);
    }

    move() {
        if(!this.view.isAnimActive()) {
            Direction.correct(this.direction.actDirection);
            var oldDirection: THREE.Vector3 = this.direction.actDirection.clone();
            var newCube: {object: Cube; toFace: THREE.Vector3} = this.actCube.moveRequest(this.actFace, oldDirection);
            if(newCube) {
                this.prevFace = this.actFace.clone();
                this.actFace = newCube.toFace;
                this.prevCube = this.actCube;
                this.actCube = newCube.object;
                this.direction.faceChanged(this.actFace, (this.prevCube.id != this.actCube.id));

                var newFace: THREE.Vector3 = this.actFace.clone();
                var oldPos: THREE.Vector3 = this.prevCube.position.clone().add(this.prevFace.clone().multiplyScalar(0.5+this.view.radius));
                var newPos: THREE.Vector3 = this.actCube.position.clone().add(newFace.multiplyScalar(0.5+this.view.radius));

                this.view.startMove(
                    oldPos,
                    newPos,
                    oldDirection,
                    this.direction.actDirection,
                    this.direction.rollAxis
                );
                this.fpControl.startMove(
                    this.prevFace,
                    this.actFace.clone(),
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

    /**
     * Just some fancy stuff. This will be called when the user pushes jump(space) button but doesn't pushes forward.
     */
    jumpUp() {
        //TODO need some jump anim from (actCube actFace) to (actCube actFace)
    }

    /**
     * The real jump.
     */
    jumpForward() {
        //the jump action is OK if:
        //  1. the ball rolls between two cubes on the same faces (from (cube A face x) to (cube B face x)) or
        //  2. the ball rolls between one cube's faces (from (cube A face x) to (cube A face y)) and it is still on the first face
        if(this.prevFace.equals(this.actFace) || (this.view.isMoveAnimActive() && !this.view.path2Active)) {
            var newCube: Cube;
            if(this.view.isMoveAnimActive()) {
                newCube = this.prevCube.jumpRequest(this.prevFace, this.direction.prevDirection);
            }
            else {
                newCube = this.actCube.jumpRequest(this.actFace, this.direction.actDirection);
            }

            if(newCube) {
                if(this.view.isMoveAnimActive()) this.direction.actDirection = this.direction.prevDirection;
                this.view.stopMoveAnimation();
                this.fpControl.stopMoveAnimation();

                this.actCube = newCube;
                var newPos = this.actCube.position.clone().add(this.prevFace.clone().multiplyScalar(0.5+this.view.radius));

                this.direction.actFace = this.prevFace;
                this.actFace = this.prevFace;

                this.view.startJump(newPos, this.direction.actDirection, this.actFace);
                this.fpControl.startJump();
            }
        }
    }

    rotate(angle: number) {
        if(!this.view.isAnimActive()) {
            var oldDir = this.direction.actDirection.clone();
            this.direction.rotateDirection(angle);
            this.direction.calculateRollAxis();
            this.view.startRotate(this.actFace, angle);

            this.fpControl.startRotation(angle, this.view.position, oldDir, this.actFace);
        }
    }
}
