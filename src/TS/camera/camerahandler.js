/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="controls/firstpersoncontrol.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../faceMap.ts"/>
var CameraHandler = (function () {
    function CameraHandler() {
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(-7, 7, -10);
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
        this.tbControl = new THREE.TrackballControls(this.camera);
        this.tbControl.noZoom = false;
        this.tbControl.noPan = true;
        this.tbControl.rotateSpeed = 3;
        this.tbControl.zoomSpeed = 10;
        this.tbControl.staticMoving = true;
        this.tbControl.minDistance = 5;
        this.tbControl.maxDistance = 50;
        this.tbControl.enabled = true;
        this.fpControl = new FirstPersonControl(this.camera);
    }
    CameraHandler.prototype.addBall = function (ball) {
        this.ball = ball;
        this.fpControl.addBallView(this.ball.view);
    };
    CameraHandler.prototype.switchControl = function () {
        if (this.tbControl.enabled) {
            this.tbControl.enabled = false;
            this.fpControl.enabled = true;
            this.changeToFirstPersonControl();
        }
        else {
            this.tbControl.enabled = true;
            this.fpControl.enabled = false;
            this.changeToTrackballControl();
        }
    };
    CameraHandler.prototype.changeToTrackballControl = function () {
        this.camera.position.set(-7, 7, -10);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
    };
    CameraHandler.prototype.changeToFirstPersonControl = function () {
        var ballPos = this.ball.view.position.clone();
        var ballDir = this.ball.direction.actDirection.clone();
        var actFace = this.ball.actFace.clone();
        var camPos = ballPos.clone().sub(ballDir.multiplyScalar(3)).add(actFace.clone().multiplyScalar(2));
        this.camera.position.set(camPos.x, camPos.y, camPos.z);
        this.camera.up.set(actFace.x, actFace.y, actFace.z);
        this.camera.lookAt(ballPos.clone());
    };
    CameraHandler.prototype.update = function (delta) {
        if (this.tbControl.enabled) {
            this.tbControl.update();
        }
        else {
            if (this.fpControl.moveActive)
                this.fpControl.updateMove(delta);
            if (this.fpControl.rotActive)
                this.fpControl.updateRotation(delta);
            if (this.fpControl.jumpActive)
                this.fpControl.updateJump();
        }
    };
    return CameraHandler;
})();
//# sourceMappingURL=camerahandler.js.map