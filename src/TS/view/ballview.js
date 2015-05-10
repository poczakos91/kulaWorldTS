/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="../model/cube.ts"/>
/// <reference path="../faceMap.ts"/>
/// <reference path="../keyeventhandler.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BallView = (function (_super) {
    __extends(BallView, _super);
    function BallView(radius, textureURL, keyHandler) {
        this.keyHandler = keyHandler;
        this.radius = radius;
        var texture = THREE.ImageUtils.loadTexture(textureURL);
        texture.minFilter = THREE.LinearFilter;
        _super.call(this, new THREE.SphereGeometry(radius, 20, 20), new THREE.MeshPhongMaterial({ map: texture }));
        this.speed = 4;
        //init rotation tools
        this.rotActive = false;
        this.rotAxis = new THREE.Vector3();
        //init move tools
        this.moveActive = false;
        this.from = new THREE.Vector3();
        this.to = new THREE.Vector3();
        this.breakPoint = new THREE.Vector3();
        this.path1 = new THREE.Vector3();
        this.path2 = new THREE.Vector3();
        this.velocity1 = new THREE.Vector3();
        this.velocity2 = new THREE.Vector3();
        this.path2Active = false;
        this.path1Length = this.path2Length = this.pathLength = this.velocity1Length = this.velocity2Length = this.pathDone = 0;
    }
    BallView.prototype.setPosition = function (cube, face) {
        var newPos = cube.position.clone();
        newPos.add(Face.stringToVector(face).multiplyScalar(0.5 + this.radius));
        this.position.set(newPos.x, newPos.y, newPos.z);
    };
    BallView.prototype.startMove = function (oldPos, newPos, oldDirection, newDirection, rollAxis) {
        this.from.set(oldPos.x, oldPos.y, oldPos.z);
        this.to.set(newPos.x, newPos.y, newPos.z);
        var ballDirFrom = oldDirection.clone();
        var ballDirTo = newDirection.clone();
        this.rollAxis = rollAxis.clone();
        //searching the position of the breakpoint in the path
        var specialCoordinateIndex = 0;
        for (var i = 0; i < 3; i++) {
            if (ballDirFrom.getComponent(i) == 1 || ballDirFrom.getComponent(i) == -1) {
                this.breakPoint.setComponent(i, this.to.getComponent(i));
                specialCoordinateIndex = i;
            }
            else {
                this.breakPoint.setComponent(i, this.from.getComponent(i));
            }
        }
        //if the path between 'from' and 'to' is straight then the breakpoint is in 'from'
        //not sure it is a problem, but I correct it and I take the breakpoint in the middle of the path
        if (this.breakPoint.equals(this.to)) {
            var tempPath = new THREE.Vector3();
            tempPath.subVectors(this.to, this.from);
            this.breakPoint = tempPath.multiplyScalar(0.5).add(this.from);
        }
        this.path1.subVectors(this.breakPoint, this.from);
        this.path2.subVectors(this.to, this.breakPoint);
        this.path1Length = this.path1.length();
        this.path2Length = this.path2.length();
        this.pathLength = this.path1Length + this.path2Length;
        this.path2Active = false;
        this.velocity1 = ballDirFrom.clone().multiplyScalar(this.speed);
        this.velocity1Length = this.velocity1.length();
        this.velocity2 = ballDirTo.clone().multiplyScalar(this.speed);
        this.velocity2Length = this.velocity2.length();
        this.pathDone = 0;
        this.moveActive = true;
    };
    BallView.prototype.startRotate = function (rotAxis, angle) {
        this.rotAxis.set(rotAxis.x, rotAxis.y, rotAxis.z);
        this.fullRotAngle = angle;
        this.actRotAngle = 0;
        this.rotActive = true;
    };
    BallView.prototype.update = function (delta) {
        if (this.rotActive)
            this.updateRotation(delta);
        if (this.moveActive)
            this.updateMove(delta);
    };
    BallView.prototype.updateRotation = function (delta) {
        var rotDelta = this.fullRotAngle * delta * 2;
        if (Math.abs(this.fullRotAngle) < Math.abs(this.actRotAngle + rotDelta)) {
            rotDelta = this.fullRotAngle - this.actRotAngle;
            this.rotActive = false;
            this.keyHandler.rotateDone();
        }
        this.rotateAroundWorldAxis(this.rotAxis, rotDelta);
        this.actRotAngle += rotDelta;
    };
    BallView.prototype.updateMove = function (delta) {
        if (!this.path2Active) {
            if (this.pathDone + this.velocity1Length * delta < this.path1Length) {
                this.pathDone += this.velocity1Length * delta;
                this.position.add(this.velocity1.clone().multiplyScalar(delta));
                this.updateRoll(this.velocity1Length * delta);
            }
            else {
                var newDelta = (this.pathDone - this.path1Length) / this.velocity1Length + delta;
                this.position.add(this.velocity1.clone().multiplyScalar(delta - newDelta));
                this.updateRoll(this.velocity1Length * (delta - newDelta));
                this.pathDone = 0;
                this.path2Active = true;
                delta = newDelta;
            }
        }
        if (this.path2Active) {
            if (this.pathDone + this.velocity2Length * delta < this.path2Length) {
                this.pathDone += this.velocity2Length * delta;
                this.position.add(this.velocity2.clone().multiplyScalar(delta));
                this.updateRoll(this.velocity2Length * delta);
            }
            else {
                var newDelta = (this.pathDone - this.path2Length) / this.velocity2Length + delta;
                this.position.add(this.velocity2.clone().multiplyScalar(delta - newDelta));
                this.updateRoll(this.velocity2Length * (delta - newDelta));
                this.moveActive = false;
                //if (kw.map.checkWinnerPosition()) { //TODO check the winner position
                //    kw.keyHandler.moveAnimationDone(); //TODO continue the move
                //}
                this.keyHandler.moveDone();
            }
        }
    };
    BallView.prototype.updateRoll = function (length) {
        this.rotateAroundWorldAxis(this.rollAxis, length / (2 * this.radius));
    };
    BallView.prototype.isAnimActive = function () {
        return (this.moveActive || this.rotActive);
    };
    BallView.prototype.rotateAroundWorldAxis = function (axis, angle) {
        this.rotWorldMatrix = new THREE.Matrix4();
        this.rotWorldMatrix.makeRotationAxis(axis, angle);
        this.rotWorldMatrix.multiply(this.matrix);
        this.matrix = this.rotWorldMatrix;
        this.rotation.setFromRotationMatrix(this.matrix);
    };
    return BallView;
})(THREE.Mesh);
//# sourceMappingURL=ballview.js.map