/// <reference path="../../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="../../model/ball.ts"/>

class FirstPersonControl {
    camera: THREE.PerspectiveCamera;
    enabled: boolean;

    //attributes to rotate the camera
    rotActive: boolean;
    actRot: number;
    fullRot: number;
    ballPos: THREE.Vector3;
    ballDir: THREE.Vector3;
    face: THREE.Vector3;

    //attributes to move the camera
    ballView: BallView;
    moveActive: boolean;
    faceFrom: THREE.Vector3;
    faceTo: THREE.Vector3;
    posFrom: THREE.Vector3;
    posTo: THREE.Vector3;
    ballDirFrom: THREE.Vector3;
    velocity: THREE.Vector3;
    velocityLength: number;
    fullPath: THREE.Vector3;
    fullPathLength: number;
    pathDone: number;
    upFrom: THREE.Vector3;
    upTo: THREE.Vector3;
    upDistance: THREE.Vector3;

    constructor(camera: THREE.PerspectiveCamera) {
        this.camera = camera;
        this.enabled = false;
        this.moveActive = false;

        //init rotation attributes
        this.rotActive = false;
        this.actRot = this.fullRot = 0;
        this.ballPos = new THREE.Vector3();
        this.ballDir = new THREE.Vector3();
        this.face = new THREE.Vector3();

        //init move attributes
        this.faceFrom = new THREE.Vector3();
        this.faceTo = new THREE.Vector3();
        this.posFrom = new THREE.Vector3();
        this.posTo = new THREE.Vector3();
        this.ballDirFrom = new THREE.Vector3();

        this.velocity = new THREE.Vector3();
        this.velocityLength = 0;
        this.fullPath = new THREE.Vector3();
        this.fullPathLength = 0;
        this.pathDone = 0;
        this.upFrom = new THREE.Vector3();
        this.upTo = new THREE.Vector3();
        this.upDistance = new THREE.Vector3();
    }

    addBallView(ballView: BallView) {
        this.ballView = ballView;
    }

    startMove(faceFrom: THREE.Vector3, faceTo: THREE.Vector3, posTo: THREE.Vector3, dirTo: THREE.Vector3, duration: number) {
        this.posFrom.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.posTo = posTo.clone().add(dirTo.clone().multiplyScalar(-3).add(faceTo.clone().multiplyScalar(2)));
        this.velocity.subVectors(this.posTo, this.posFrom).multiplyScalar(1/duration);
        this.velocityLength = this.velocity.length();

        this.fullPath.subVectors(this.posTo, this.posFrom);
        this.fullPathLength = this.fullPath.length();

        this.pathDone = 0;

        var crossVec = new THREE.Vector3();
        crossVec.crossVectors(faceFrom,faceTo);
        this.upFrom = faceFrom;
        this.upTo = faceTo;
        this.upDistance.subVectors(this.upTo, this.upFrom);
        this.moveActive = true;
    }

    startRotation(angle: number, ballPos: THREE.Vector3, dirFrom: THREE.Vector3, face: THREE.Vector3) {
        this.fullRot = angle;
        this.ballPos.set(ballPos.x, ballPos.y, ballPos.z);
        this.ballDir.set(dirFrom.x, dirFrom.y, dirFrom.z);
        this.face.set(face.x,face.y,face.z);
        this.actRot = 0;
        this.rotActive = true;
    }

    updateMove(delta: number): void {
        if(this.pathDone + this.velocityLength*delta < this.fullPathLength) {
            this.pathDone += this.velocityLength*delta;
            this.camera.position.add(this.velocity.clone().multiplyScalar(delta));
            this.camera.up = this.upFrom.clone().add(this.upDistance.clone().multiplyScalar(this.pathDone/this.fullPathLength));
            this.camera.lookAt(this.ballView.position);
        }
        else {
            var newDelta = (this.pathDone-this.fullPathLength)/this.velocityLength+delta;
            this.camera.position.add(this.velocity.clone().multiplyScalar(delta - newDelta));
            this.camera.up = this.upTo.clone();
            this.camera.lookAt(this.ballView.position);
            this.moveActive = false;
        }
        console.log("camera's attributes during rot ");
        console.log("pos: "+this.camera.position.x+" # "+this.camera.position.y+" # "+this.camera.position.z);
        console.log("up: "+this.camera.up.x+" "+this.camera.up.y+" "+this.camera.up.z);
        console.log("----------------------------------------------------");
    }

    updateRotation(delta: number): void {
        delta *= 2;
        this.actRot += this.fullRot*delta;
        if(Math.abs(this.actRot) > Math.abs(this.fullRot)) {
            this.actRot=this.fullRot;
            this.rotActive = false;
        }
        var pos = this.ballPos.clone().add(this.ballDir.clone().multiplyScalar(-3).applyAxisAngle(this.face,this.actRot).add(this.face.clone().multiplyScalar(2)));
        this.camera.position.set(pos.x, pos.y, pos.z);
        this.camera.lookAt(this.ballPos);
        if(!this.rotActive) {
            console.log("camera's position after rotation");
            console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z);
            console.log(this.camera.up.x, this.camera.up.y, this.camera.up.z);
        }
    }
}
