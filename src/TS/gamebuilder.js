/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="space.ts"/>
/// <reference path="lighting.ts"/>
/// <reference path="idle.ts"/>
/// <reference path="keyeventhandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="camera/camerahandler.ts"/>
var GameBuilder = (function () {
    function GameBuilder() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        this.lighting = new Lighting(this.scene);
        this.background = new Space(this.scene);
        this.cameraHandler = new CameraHandler();
        this.keyHandler = new KeyEventHandler(this.cameraHandler);
        window.addEventListener('resize', this.onWindowResize.bind(this));
        $("#WebGL-output").append(this.renderer.domElement);
        this.renderer.render(this.scene, this.cameraHandler.camera);
    }
    GameBuilder.prototype.onWindowResize = function () {
        this.cameraHandler.camera.aspect = window.innerWidth / window.innerHeight;
        this.cameraHandler.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    GameBuilder.prototype.startGame = function (rawMap) {
        this.map = new MapModel();
        this.map.generateModel(JSON.parse(rawMap), this.keyHandler, this.cameraHandler);
        this.scene.add(this.map.view);
        this.keyHandler.addBall(this.map.ball);
        this.keyHandler.addListeners();
        this.cameraHandler.addBall(this.map.ball);
        //I need this little tricky solution to start the game because the initiating of cubeViews can take
        //a lot of time. CubeViews download .obj models from server and sign this download with their pendingDownloads
        //attributes. So if there is a cubeView which has nonzero pendingDownloads attributes, the model downloading isn't happened yet.
        var intervalID = setInterval(function () {
            for (var i = 0; i < this.map.cubes.length; i++) {
                if (this.map.cubes[i].view.pendingDownloads > 0)
                    return;
            }
            clearInterval(intervalID);
            this.idleLoop = new Idle(this.renderer, this.scene, this.cameraHandler, this.map.ball.view, this.map.cubes);
            this.idleLoop.onIdle();
        }.bind(this), 20);
    };
    GameBuilder.prototype.stopGame = function () {
        this.keyHandler.removeListeners();
        this.idleLoop.removeOnIdle();
        this.scene.remove(this.map.view);
        this.cameraHandler.tbControl.enabled = true;
        this.cameraHandler.changeToTrackballControl();
        this.cameraHandler.fpControl = new FirstPersonControl(this.cameraHandler.camera);
    };
    GameBuilder.prototype.gameSucceeded = function () {
        this.keyHandler.removeListeners();
        this.cameraHandler.tbControl.enabled = true;
        this.cameraHandler.changeToTrackballControl();
    };
    return GameBuilder;
})();
//# sourceMappingURL=gamebuilder.js.map