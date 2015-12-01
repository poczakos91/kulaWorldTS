/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="cube.ts"/>
/// <reference path="map.ts"/>
/// <reference path="balldirection.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../directionMap.ts"/>
/// <reference path="../camera/controls/firstpersoncontrol.ts"/>
var Ball = (function () {
    function Ball(startingCube, startingFace, startingDirection, map, fpControl) {
        this.actCube = startingCube;
        this.actFace = startingFace;
        this.direction = new DirectionHandler(startingFace, startingDirection);
        this.map = map;
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
                var oldFace = Face.stringToVector(this.actFace);
                this.actFace = newCube.toFace;
                var oldCube = this.actCube;
                this.actCube = this.map.getCubeByID(newCube.cubeID);
                this.direction.faceChanged(this.actFace, (oldCube.id != this.actCube.id));
                var newFace = Face.stringToVector(this.actFace);
                var oldPos = oldCube.position.clone().add(oldFace.multiplyScalar(0.5 + this.view.radius));
                var newPos = this.actCube.position.clone().add(newFace.multiplyScalar(0.5 + this.view.radius));
                this.view.startMove(oldPos, newPos, oldDirection, this.direction.actDirection, this.direction.rollAxis);
                this.fpControl.startMove(oldFace, Face.stringToVector(this.actFace), newPos, this.direction.actDirection, this.view.path1Length / this.view.velocity1Length + this.view.path2Length / this.view.velocity2Length);
            }
            else {
                console.log("There's no possible place to move");
            }
        }
    };
    Ball.prototype.rotate = function (angle) {
        if (!this.view.isAnimActive()) {
            var oldDir = this.direction.actDirection.clone();
            this.direction.rotateDirection(angle);
            this.direction.calculateRollAxis();
            this.view.startRotate(Face.stringToVector(this.actFace), angle);
            this.fpControl.startRotation(angle, this.view.position, oldDir, Face.stringToVector(this.actFace));
        }
    };
    return Ball;
})();
//# sourceMappingURL=ball.js.map