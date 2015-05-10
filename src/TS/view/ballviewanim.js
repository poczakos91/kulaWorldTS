/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="ballview.ts"/>
var BallViewAnim = (function () {
    function BallViewAnim(ballView) {
        this.ballView = ballView;
        this.moveAnimActive = false;
        this.rotateAnimActive = false;
        //TODO implement other things from js version
    }
    BallViewAnim.prototype.updateMove = function (delta) {
        //TODO
    };
    BallViewAnim.prototype.updateRotation = function (delta) {
        //TODO
    };
    BallViewAnim.prototype.updateRoll = function (delta) {
        //TODO
    };
    return BallViewAnim;
})();
//# sourceMappingURL=ballviewanim.js.map