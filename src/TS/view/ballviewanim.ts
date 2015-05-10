/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="ballview.ts"/>

class BallViewAnim {
    ballView: BallView;
    moveAnimActive: boolean;
    rotateAnimActive: boolean;

    constructor(ballView: BallView) {
        this.ballView = ballView;
        this.moveAnimActive = false;
        this.rotateAnimActive = false;
        //TODO implement other things from js version
    }

    updateMove(delta: number) {
        //TODO
    }

    updateRotation(delta: number) {
        //TODO
    }

    private updateRoll(delta) {
        //TODO
    }
}
