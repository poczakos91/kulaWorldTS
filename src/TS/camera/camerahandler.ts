/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="controls/firstpersoncontrol.ts"/>
/// <reference path="../view/ballview.ts"/>
/// <reference path="../faceMap.ts"/>

class CameraHandler {
    camera: THREE.PerspectiveCamera;
    fpControl: FirstPersonControl;
    tbControl: THREE.TrackballControls;
    ball: Ball;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 2000);
        this.camera.position.set(-7,7,-10);
        this.camera.lookAt(new THREE.Vector3(0,1,0));

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

    addBall(ball: Ball) {
        this.ball = ball;
        this.fpControl.addBallView(this.ball.view);
    }

    switchControl() {
        if(this.tbControl.enabled) {
            this.tbControl.enabled = false;
            this.fpControl.enabled = true;
            this.changeToFirstPersonControl();
        }
        else {
            this.tbControl.enabled = true;
            this.fpControl.enabled = false;
            this.changeToTrackballControl();
        }
    }

    changeToTrackballControl(): void {
        this.camera.position.set(-7,7,-10);
        this.camera.up.set(0,1,0);
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
    }

    changeToFirstPersonControl(): void {
        var ballPos = this.ball.view.position.clone();
        var ballDir = this.ball.direction.actDirection.clone();
        var actFace = Face.stringToVector(this.ball.actFace);
        var camPos = ballPos.clone().sub(ballDir.multiplyScalar(3)).add(actFace.clone().multiplyScalar(2));
        this.camera.position.set(camPos.x, camPos.y, camPos.z);
        this.camera.up.set(actFace.x, actFace.y, actFace.z);
        this.camera.lookAt(ballPos.clone());

    }

    update(delta: number): void {
        if(this.tbControl.enabled) {
            this.tbControl.update();
        }
        else {
            if(this.fpControl.moveActive) this.fpControl.updateMove(delta);
            if(this.fpControl.rotActive) this.fpControl.updateRotation(delta);
        }
    }
}