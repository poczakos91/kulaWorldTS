/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="view/ballview.ts"/>
var Idle = (function () {
    function Idle(renderer, scene, cameraHandler, ballView) {
        this.renderer = renderer;
        this.scene = scene;
        this.cameraHandler = cameraHandler;
        this.ballView = ballView;
        this.clock = new THREE.Clock();
        this.clock.start();
        this.onIdleWithContext = this.onIdle.bind(this);
    }
    Idle.prototype.onIdle = function () {
        this.animationFrameID = window.requestAnimationFrame(this.onIdleWithContext);
        this.renderer.render(this.scene, this.cameraHandler.camera);
        var delta = this.clock.getDelta();
        this.cameraHandler.update(delta);
        this.ballView.update(delta);
    };
    Idle.prototype.removeOnIdle = function () {
        window.cancelAnimationFrame(this.animationFrameID);
    };
    return Idle;
})();
//# sourceMappingURL=idle.js.map