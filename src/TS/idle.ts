/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="view/ballview.ts"/>

class Idle {
    animationFrameID: number;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    cameraHandler: CameraHandler;
    ballView: BallView;
    clock: THREE.Clock;
    onIdleWithContext: any;

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, cameraHandler: CameraHandler, ballView: BallView) {
        this.renderer = renderer;
        this.scene = scene;
        this.cameraHandler = cameraHandler;
        this.ballView = ballView;
        this.clock = new THREE.Clock();
        this.clock.start();
        this.onIdleWithContext = this.onIdle.bind(this);
    }

    onIdle(): void {
        this.animationFrameID = window.requestAnimationFrame(this.onIdleWithContext);
        this.renderer.render(this.scene, this.cameraHandler.camera);
        var delta = this.clock.getDelta();
        this.cameraHandler.update(delta);
        this.ballView.update(delta);
    }

    removeOnIdle(): void {
        window.cancelAnimationFrame(this.animationFrameID);
    }
}

