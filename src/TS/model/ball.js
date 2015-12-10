/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="cube.ts"/>
/// <reference path="map.ts"/>
/// <reference path="balldirection.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../camera/controls/firstpersoncontrol.ts"/>
var Ball = (function () {
    function Ball(startingCube, startingFace, startingDirection, /* map: MapModel,*/ fpControl) {
        this.actCube = startingCube;
        this.actFace = Face.v[startingFace];
        this.prevFace = Face.v[startingFace];
        this.direction = new DirectionHandler(startingFace, startingDirection);
        //this.map = map;
        this.fpControl = fpControl;
    }
    Ball.prototype.setView = function (view) {
        this.view = view;
        this.view.setPosition(this.actCube, this.actFace);
    };
    Ball.prototype.move = function () {
        if (!this.view.isAnimActive()) {
            Direction.correct(this.direction.actDirection);
            var oldDirection = this.direction.actDirection.clone();
            var newCube = this.actCube.moveRequest(this.actFace, oldDirection);
            if (newCube) {
                this.prevFace = this.actFace.clone();
                this.actFace = newCube.toFace;
                this.prevCube = this.actCube;
                this.actCube = newCube.object;
                this.direction.faceChanged(this.actFace, (this.prevCube.id != this.actCube.id));
                var newFace = this.actFace.clone();
                var oldPos = this.prevCube.position.clone().add(this.prevFace.clone().multiplyScalar(0.5 + this.view.radius));
                var newPos = this.actCube.position.clone().add(newFace.multiplyScalar(0.5 + this.view.radius));
                this.view.startMove(oldPos, newPos, oldDirection, this.direction.actDirection, this.direction.rollAxis);
                this.fpControl.startMove(this.prevFace, this.actFace.clone(), newPos, this.direction.actDirection, this.view.path1Length / this.view.velocity1Length + this.view.path2Length / this.view.velocity2Length);
            }
            else {
                console.log("There's no possible place to move");
            }
        }
    };
    /**
     * Just some fancy stuff. This will be called when the user pushes jump(space) button but doesn't pushes forward.
     */
    Ball.prototype.jumpUp = function () {
        this.view.startJumpUp(this.actFace);
        this.fpControl.startJump();
        this.prevFace = this.actFace.clone();
    };
    /**
     * The real jump.
     */
    Ball.prototype.jumpForward = function () {
        Direction.correct(this.direction.actDirection);
        //the jump action is OK if:
        //  1. the ball rolls or rolled between two cubes on the same faces (from (cube A face x) to (cube B face x)) or
        var condition1 = this.prevFace.equals(this.actFace);
        //  2. the ball rolls between one cube's faces (from (cube A face x) to (cube A face y)) and it is still on the first face or
        var condition2 = (this.view.isMoveAnimActive() && !this.view.path2Active);
        //  3. tha ball is making a jumpUp and then comes a 'forward' event. If the jumpUp is in early phase (pl. the first 0.2 sec) it can transform to a jumpForward
        var condition3 = (this.view.jumpUpActive && this.view.jumpDurationCtr / this.view.jumpDuration < 0.3);
        if (condition1 || condition2 || condition3) {
            var newCube;
            if (this.view.isMoveAnimActive()) {
                newCube = this.prevCube.jumpRequest(this.prevFace, this.direction.prevDirection);
            }
            else {
                newCube = this.actCube.jumpRequest(this.actFace, this.direction.actDirection);
            }
            if (newCube) {
                if (this.view.isMoveAnimActive())
                    this.direction.actDirection = this.direction.prevDirection;
                this.actCube = newCube;
                var newPos = this.actCube.position.clone().add(this.prevFace.clone().multiplyScalar(0.5 + this.view.radius));
                this.direction.actFace = this.prevFace;
                this.actFace = this.prevFace;
                if (this.view.moveActive) {
                    this.view.stopMoveAnimation();
                    this.fpControl.stopMoveAnimation();
                }
                if (this.view.jumpUpActive) {
                    this.view.stopJumpUpAnimation();
                    this.fpControl.stopJumpUpAnimation();
                }
                this.direction.calculateRollAxis();
                this.view.startJump(newPos, this.direction.actDirection, this.actFace, this.direction.rollAxis);
                this.fpControl.startJump();
            }
        }
    };
    Ball.prototype.rotate = function (angle) {
        if (!this.view.isAnimActive()) {
            var oldDir = this.direction.actDirection.clone();
            this.prevFace = this.actFace;
            this.direction.prevDirection = this.direction.actDirection.clone();
            this.direction.rotateDirection(angle);
            this.direction.calculateRollAxis();
            this.view.startRotate(this.actFace, angle);
            this.fpControl.startRotation(angle, this.view.position, oldDir, this.actFace);
        }
    };
    return Ball;
})();
//# sourceMappingURL=ball.js.map