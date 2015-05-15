/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="model/ball.ts"/>
/// <reference path="camera/camerahandler.ts"/>
var KeyEventHandler = (function () {
    function KeyEventHandler(cameraHandler) {
        this.cameraHandler = cameraHandler;
        this.pushedKeys = { forward: false, left: false, right: false, jump: false };
        this.listenKeyDownsContext = this.listenKeyDowns.bind(this);
        this.listenKeyUpsContext = this.listenKeyUps.bind(this);
    }
    KeyEventHandler.prototype.addBall = function (ball) {
        this.ball = ball;
    };
    KeyEventHandler.prototype.listenKeyDowns = function (e) {
        switch (e.which) {
            case 38:
                if (!this.pushedKeys.forward) {
                    this.pushedKeys.forward = true;
                    this.ball.move();
                }
                break;
            case 37:
                if (!this.pushedKeys.left) {
                    this.pushedKeys.left = true;
                    this.ball.rotate(Math.PI / 2);
                }
                break;
            case 39:
                if (!this.pushedKeys.right) {
                    this.pushedKeys.right = true;
                    this.ball.rotate(-Math.PI / 2);
                }
                break;
            case 32:
                if (!this.pushedKeys.jump) {
                    this.pushedKeys.jump = true;
                }
                break;
            case 83:
                this.cameraHandler.switchControl();
                break;
            case 66:
                break;
        }
    };
    KeyEventHandler.prototype.listenKeyUps = function (e) {
        switch (e.which) {
            case 38:
                this.pushedKeys.forward = false;
                break;
            case 37:
                this.pushedKeys.left = false;
                break;
            case 39:
                this.pushedKeys.right = false;
                break;
            case 32:
                this.pushedKeys.jump = false;
                break;
        }
    };
    KeyEventHandler.prototype.addListeners = function () {
        var body = $('body');
        body.on("keydown", this.listenKeyDownsContext);
        body.on("keyup", this.listenKeyUpsContext);
    };
    KeyEventHandler.prototype.removeListeners = function () {
        var body = $('body');
        body.off("keydown", this.listenKeyDownsContext);
        body.off("keyup", this.listenKeyUpsContext);
    };
    KeyEventHandler.prototype.moveDone = function () {
        if (this.pushedKeys.forward) {
            this.ball.move();
        }
    };
    KeyEventHandler.prototype.rotateDone = function () {
        if (this.pushedKeys.left) {
            this.ball.rotate(Math.PI / 2);
        }
        else if (this.pushedKeys.right) {
            this.ball.rotate(-Math.PI / 2);
        }
    };
    return KeyEventHandler;
})();
//# sourceMappingURL=keyeventhandler.js.map