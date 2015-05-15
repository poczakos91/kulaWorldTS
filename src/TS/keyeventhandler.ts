/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="model/ball.ts"/>
/// <reference path="camera/camerahandler.ts"/>

class KeyEventHandler {
    pushedKeys: {forward: boolean; left: boolean; right: boolean; jump: boolean};
    ball: Ball;
    cameraHandler: CameraHandler;
    listenKeyDownsContext: any;
    listenKeyUpsContext: any;

    constructor(cameraHandler: CameraHandler) {
        this.cameraHandler = cameraHandler;
        this.pushedKeys = {forward: false, left: false, right: false, jump: false};
        this.listenKeyDownsContext = this.listenKeyDowns.bind(this);
        this.listenKeyUpsContext = this.listenKeyUps.bind(this);
    }

    addBall(ball: Ball) {
        this.ball = ball;
    }

    listenKeyDowns(e) {
        switch(e.which) {
            case 38 :                                   //FORWARD
                if(!this.pushedKeys.forward) {
                    this.pushedKeys.forward = true;
                    this.ball.move();
                }
                break;
            case 37 :                                   //LEFT
                if(!this.pushedKeys.left) {
                    this.pushedKeys.left = true;
                    this.ball.rotate(Math.PI/2);
                }
                break;
            case 39 :                                   //RIGHT
                if(!this.pushedKeys.right) {
                    this.pushedKeys.right = true;
                    this.ball.rotate(-Math.PI/2);
                }
                break;
            case 32 :                                   //JUMP (space)
                if(!this.pushedKeys.jump) {
                    this.pushedKeys.jump = true;
                    //TODO jump implementation
                }
                break;
            case 83:                                    //'s' SWITCH CAMERA
                this.cameraHandler.switchControl();
                break;
            case 66:                                    //'b' just for testing

                break;
        }
    }

    listenKeyUps(e) {
        switch(e.which) {
            case 38 :                                   //FORWARD
                this.pushedKeys.forward = false;
                break;
            case 37 :                                   //LEFT
                this.pushedKeys.left = false;
                break;
            case 39 :                                   //RIGHT
                this.pushedKeys.right = false;
                break;
            case 32 :                                   //JUMP (space)
                this.pushedKeys.jump = false;
                break;
        }
    }

    addListeners() {
        var body = $('body');
        body.on("keydown", this.listenKeyDownsContext);
        body.on("keyup", this.listenKeyUpsContext);
    }

    removeListeners() {
        var body = $('body');
        body.off("keydown", this.listenKeyDownsContext);
        body.off("keyup", this.listenKeyUpsContext);
    }

    moveDone() {
        if(this.pushedKeys.forward) {
            this.ball.move();
        }
    }

    rotateDone() {
        if(this.pushedKeys.left) {
            this.ball.rotate(Math.PI/2);
        }
        else if(this.pushedKeys.right) {
            this.ball.rotate(-Math.PI/2);
        }
    }
}