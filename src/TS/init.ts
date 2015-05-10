/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="space.ts"/>
/// <reference path="lighting.ts"/>
/// <reference path="idle.ts"/>
/// <reference path="keyeventhandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="model/maploader.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class GameBuilder {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    background: Space;
    lighting: Lighting;
    idleLoop: Idle;
    cameraHandler: CameraHandler;
    map: MapModel;
    keyHandler: KeyEventHandler;

    constructor() {

    }

    addWebGl(): void {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.shadowMapEnabled = true;

        this.lighting = new Lighting(this.scene);

        //var sphereGeom = new THREE.SphereGeometry(10,30,30);
        //var mat = new THREE.MeshPhongMaterial({color: 0x33aa44});
        //var sphere = new THREE.Mesh(sphereGeom,mat);
        //sphere.position.set(40,0,100);
        //this.scene.add(sphere);
        //
        //var sphereGeom2 = new THREE.SphereGeometry(2,30,30);
        //var texture1 = THREE.ImageUtils.loadTexture( "res/img/mars.png");
        //var texture2 = THREE.ImageUtils.loadTexture( "res/img/marsBump.png");
        //var mat2 = new THREE.MeshPhongMaterial({color: 0x3388ff/*, map: texture1, bumpMap: texture2*/});
        //var sphere2 = new THREE.Mesh(sphereGeom2,mat2);
        //sphere2.position.set(0,0,0);
        //this.scene.add(sphere2);


        this.background = new Space(this.scene);

        this.cameraHandler = new CameraHandler();
        this.keyHandler = new KeyEventHandler(this.cameraHandler);
        window.addEventListener('resize', this.onWindowResize.bind(this));


        $("#WebGL-output").append(this.renderer.domElement);


        loadMap("test01.json", this.startGame, this);
    }

    private onWindowResize() {
        this.cameraHandler.camera.aspect = window.innerWidth/window.innerHeight;
        this.cameraHandler.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startGame(rawMap) {

        this.map = new MapModel();
        this.map.generateModel(JSON.parse(rawMap), this.keyHandler, this.cameraHandler.fpControll);
        this.scene.add(this.map.view);
        this.keyHandler.addBall(this.map.ball);
        this.cameraHandler.addBall(this.map.ball);

        this.idleLoop = new Idle(this.renderer,this.scene,this.cameraHandler, this.map.ball.view);
        this.idleLoop.onIdle();
    }
}

var game = new GameBuilder();
$(game.addWebGl.bind(game));
