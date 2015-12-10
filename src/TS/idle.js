/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="view/ballview.ts"/>
var Idle = (function () {
    function Idle(renderer, scene, cameraHandler, ballView, cubes) {
        this.renderer = renderer;
        this.scene = scene;
        this.cameraHandler = cameraHandler;
        this.ballView = ballView;
        this.clock = new THREE.Clock();
        this.clock.start();
        this.onIdleWithContext = this.onIdle.bind(this);
        this.updateableCubes = [];
        for (var i = 0; i < cubes.length; i++) {
            if (cubes[i].keys.length > 0 || cubes[i].coins.length > 0) {
                this.updateableCubes.push(cubes[i].view);
            }
        }
    }
    Idle.prototype.onIdle = function () {
        this.animationFrameID = window.requestAnimationFrame(this.onIdleWithContext);
        this.renderer.render(this.scene, this.cameraHandler.camera);
        var delta = this.clock.getDelta();
        this.ballView.update(delta);
        this.cameraHandler.update(delta);
        for (var i = 0; i < this.updateableCubes.length; i++)
            this.updateableCubes[i].update(delta);
    };
    Idle.prototype.removeOnIdle = function () {
        window.cancelAnimationFrame(this.animationFrameID);
    };
    return Idle;
})();
//# sourceMappingURL=idle.js.map