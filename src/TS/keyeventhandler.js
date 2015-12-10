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
                    if (this.ball.view.jumpUpActive)
                        this.ball.jumpForward();
                    else
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
                if (!this.pushedKeys.jump && !this.ball.view.jumpActive && !this.ball.view.jumpUpActive) {
                    this.pushedKeys.jump = true;
                    if (this.ball.view.isMoveAnimActive() || (!this.ball.view.isRotAnimActive() && this.pushedKeys.forward)) {
                        this.ball.jumpForward();
                    }
                    else
                        this.ball.jumpUp();
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
                clearTimeout(this.eventID);
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
        this.pushedKeys.forward = false;
        this.pushedKeys.jump = false;
        clearTimeout(this.eventID);
    };
    /**
     * This function is called when the ball's moving is ended. If the forward key is still pushed
     * this function 'triggers' a new "forward key event"
     */
    KeyEventHandler.prototype.moveDone = function () {
        if (this.pushedKeys.forward) {
            //if I don't set this to false the key eventHandler won't call the ball's move function
            this.pushedKeys.forward = false;
            //the keyEventHandler can't be call directly. The ball's "updateMove" function calls this
            //function. If I would call the 'listenKeyDowns' function directly it would call the
            //ball's startMove function directly.
            //Tehát valami ilyesmi lenne: ball.updateMove -> keyHandler.moveDone -> keyHandler.listenKeyDowns -> ball.startMove
            //Tehát a labda valahol önmagát hívná. Ez hazavágja az animációt. Meg kell várni, míg az ezt a függvényt
            //hívó ball.updateMove véget ér, az idleLoop frissíti az animációkat, és csak ezután meghívni újra
            //a listenKeyDowns függvényt.
            this.eventID = setTimeout(this.listenKeyDowns.bind(this, { which: 38 }), 20);
        }
    };
    /**
     * This function is called when the ball's rotation is ended. If the left/right key is still pushed
     * this function 'triggers' a new "left/right key event"
     */
    KeyEventHandler.prototype.rotateDone = function () {
        if (this.pushedKeys.left)
            this.pushedKeys.left = false;
        else if (this.pushedKeys.right)
            this.pushedKeys.right = false;
        else if (this.pushedKeys.forward) {
            //ha már a forgás befejezése előtt megnyomta a user az előrét, akkor a forgás befejeztekor nem indul el
            //előre a labda. Ezért triggereljük a listenKeyDowns függvényt a feljebb látott módon.
            this.eventID = setTimeout(this.listenKeyDowns.bind(this, { which: 38 }), 20);
            this.pushedKeys.forward = false;
        }
    };
    return KeyEventHandler;
})();
//# sourceMappingURL=keyeventhandler.js.map