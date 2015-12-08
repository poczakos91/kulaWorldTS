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
    function BallView(radius, textureURL, keyHandler, map) {
        this.keyHandler = keyHandler;
        this.radius = radius;
        this.map = map;
        var texture = THREE.ImageUtils.loadTexture(textureURL);
        texture.minFilter = THREE.LinearFilter;
        _super.call(this, new THREE.SphereGeometry(radius, 20, 20), new THREE.MeshPhongMaterial({ map: texture }));
        this.moveSpeed = 4;
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
        //init jump tools
        this.jumpActive = false;
        this.gravityStrength = 30;
        this.jumpHeight = 1;
        this.jumpVelocity = new THREE.Vector3();
    }
    BallView.prototype.setPosition = function (cube, face) {
        var newPos = cube.position.clone();
        newPos.add(face.clone().multiplyScalar(0.5 + this.radius));
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
        this.velocity1 = ballDirFrom.clone().multiplyScalar(this.moveSpeed);
        this.velocity1Length = this.velocity1.length();
        this.velocity2 = ballDirTo.clone().multiplyScalar(this.moveSpeed);
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
    BallView.prototype.startJump = function (targetPos, viewDir, jumpDir) {
        this.jumpTargetPos = targetPos.clone();
        this.gravityDirection = jumpDir.clone().multiplyScalar(-1);
        var jumpUpVelocity, jumpForwardVelocity;
        //kiszámolom a labda kezdősebességének azt a részét, ami a felemelkedéshez kell
        jumpUpVelocity = Math.sqrt(2 * this.gravityStrength * this.jumpHeight);
        //kiszámolom úthossz (viewDir.getComponent(i) !== null) komponensének azon részét, amit a labda az ugrásának legmagasabb pontjától a földetérésig megtesz (jumpDistanceY2)
        var jumpDistanceY2;
        for (var i = 0; i < 3; i++) {
            if (viewDir.getComponent(i)) {
                var helperVector = new THREE.Vector3();
                helperVector.setComponent(i, targetPos.getComponent(i) - this.position.getComponent(i));
                jumpDistanceY2 = this.position.clone().add(helperVector).sub(targetPos).length() + this.jumpHeight;
                break;
            }
        }
        //a korában kiszámolt adatok birtokában már tudom, hogy meddig fog tartani az ugrás
        this.jumpDuration = jumpUpVelocity / this.gravityStrength + Math.sqrt(2 * jumpDistanceY2 / this.gravityStrength);
        for (i = 0; i < 3; i++) {
            if (viewDir.getComponent(i)) {
                jumpForwardVelocity = Math.abs(targetPos.getComponent(i) - this.position.getComponent(i)) / this.jumpDuration;
                break;
            }
        }
        this.jumpVelocity = jumpDir.clone().multiplyScalar(jumpUpVelocity).add(viewDir.clone().multiplyScalar(jumpForwardVelocity));
        this.jumpActive = true;
        this.jumpDurationCtr = 0;
    };
    BallView.prototype.updateJump = function (delta) {
        if (this.jumpDurationCtr + delta < this.jumpDuration) {
            this.position.add(this.jumpVelocity.clone().multiplyScalar(delta));
            this.jumpVelocity.add(this.gravityDirection.clone().multiplyScalar(this.gravityStrength * delta));
            this.jumpDurationCtr += delta;
        }
        else {
            this.position.set(this.jumpTargetPos.x, this.jumpTargetPos.y, this.jumpTargetPos.z);
            this.jumpActive = false;
            if (this.map.checkWinnerPosition()) {
                this.keyHandler.moveDone();
            }
        }
    };
    BallView.prototype.update = function (delta) {
        if (this.rotActive)
            this.updateRotation(delta);
        if (this.moveActive)
            this.updateMove(delta);
        if (this.jumpActive)
            this.updateJump(delta);
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
                if (this.map.checkWinnerPosition()) {
                    this.keyHandler.moveDone();
                }
            }
        }
    };
    BallView.prototype.updateRoll = function (length) {
        this.rotateAroundWorldAxis(this.rollAxis, length / (2 * this.radius));
    };
    BallView.prototype.isAnimActive = function () {
        return (this.moveActive || this.rotActive || this.jumpActive);
    };
    BallView.prototype.isMoveAnimActive = function () {
        return this.moveActive;
    };
    BallView.prototype.isRotAnimActive = function () {
        return this.rotActive;
    };
    BallView.prototype.rotateAroundWorldAxis = function (axis, angle) {
        this.rotWorldMatrix = new THREE.Matrix4();
        this.rotWorldMatrix.makeRotationAxis(axis, angle);
        this.rotWorldMatrix.multiply(this.matrix);
        this.matrix = this.rotWorldMatrix;
        this.rotation.setFromRotationMatrix(this.matrix);
    };
    BallView.prototype.stopMoveAnimation = function () {
        this.moveActive = false;
    };
    return BallView;
})(THREE.Mesh);
//# sourceMappingURL=ballview.js.map