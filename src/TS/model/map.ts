/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../model/cube.ts"/>
/// <reference path="../model/ball.ts"/>
/// <reference path="../view/mapview.ts"/>
/// <reference path="../camera/camerahandler.ts"/>
/// <reference path="../init.ts"/>

class MapModel {
    cubes: Cube[];
    gameEndTextOrientation: GameEndTextOrientation;
    target: TargetCube;
    view: MapView;
    ball: Ball;
    keysLeft: number;
    coinCounter: JQuery;
    constructor(){}

    generateModel(rawMap: mapDescription, keyHandler: KeyEventHandler, cameraHandler: CameraHandler) {
        //initializing the array of cubes
        this.cubes = [];
        for(var i = 0,sizeI=rawMap.elements.length;i<sizeI;i++) {

        }
        //creating the cubes
        for(var i=0,size=rawMap.elements.length;i<size;i++) {
            for(var j=0;j<rawMap.elements[i].length;j++) {
                for(var k=0;k<rawMap.elements[i][j].length;k++) {
                    var cube: CubeDescription = rawMap.elements[i][j][k];
                    if(cube.id != undefined) {
                        this.cubes.push(
                            new Cube(
                                cube.id,
                                rawMap.cubeSize,
                                parseInt(cube.color,16),
                                new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z),
                                this,
                                cube.keys ? cube.keys : [],
                                cube.coins ? cube.coins : [],
                                cube.traps ? cube.traps : []
                            )
                        );
                    }
                }
            }
        }

        this.gameEndTextOrientation = rawMap.messageOrientation;
        this.target = rawMap.target;

        //coloring the target cube's target face on the map
        this.getCubeByID(this.target.id).getView().paintFace(this.target.face, 0xff2800);

        this.view = new MapView();
        this.view.appendChildrenFromModel(this.cubes);
        this.view.position.set(0,0,0);
        this.ball = new Ball(
            this.getCubeByID(rawMap.ball.startingCube),
            rawMap.ball.startingFace,
            rawMap.ball.startingDirection,
            cameraHandler.fpControl
        );
        var ballView: BallView = new BallView(0.3,rawMap.ball.texture.colorMapURL,keyHandler, this);
        this.view.add(ballView);
        this.ball.setView(ballView);

        this.keysLeft = 0;
        for(var i=0;i<this.cubes.length;i++) {
            this.keysLeft += this.cubes[i].keys.length;
        }
        this.checkExtraObjects();

        this.coinCounter = $("#coinCounter");
    }

    getCubeByID(id: number): Cube {
        for(var i=this.cubes.length-1;i>=0;i--) {
            if(this.cubes[i].id == id)
                return this.cubes[i];
        }
        throw "There is no cube with the given id: "+id;
    }

    /**
     * Gets the cube that is int the position the parameters show
     * @returns {Cube | null} - if there's no cube the return value is null
     */
    getCubeByPosition(pos: THREE.Vector3): any;
    getCubeByPosition(x: number, y: number, z: number): any;
    getCubeByPosition(x: any, y?: number, z?: number): any {
        if(x instanceof THREE.Vector3) {
            y = x.y; z = x.z; x = x.x;
        }
        for(var i=0, size=this.cubes.length;i<size;i++) {
            if(this.cubes[i].position.x===x && this.cubes[i].position.y===y && this.cubes[i].position.z===z) {
                return this.cubes[i];
            }
        }
        return null;
    }

    /**
     * Returns the cubes those have two same coordinates (dimValue1, dimValue2).
     * Dimension indexes can be 0 (x dimension), 1 (y dimension), 2 (z dimension)
     * @param dimIndex1 - first dimension index
     * @param dimValue1 - the coordinate the belongs to dimIndex1 dimension
     * @param dimIndex2 - second dimension index
     * @param dimValue2 - the coordinate the belongs to dimIndex2 dimension
     */
    getCubesFromALine(dimIndex1: number, dimValue1: number, dimIndex2: number, dimValue2: number): Cube[] {
        var cubes: Cube[] = [];
        for(var i=0, size=this.cubes.length;i<size;i++) {
            if(this.cubes[i].position.getComponent(dimIndex1) === dimValue1 && this.cubes[i].position.getComponent(dimIndex2) === dimValue2) {
                cubes.push(this.cubes[i]);
            }
        }
        return cubes;
    }

    checkWinnerPosition(): boolean {
        if(this.ball.actCube.id === this.target.id && Face.vectorToString(this.ball.actFace) === this.target.face && this.keysLeft===0) {
            this.showEndMessage("You win! :)", 0x33bb33);
            return false;
        }
        return true;
    }

    checkExtraObjects() {
        var actCube = this.ball.actCube;
        var actFace = this.ball.actFace;

        //checking keys
        for(var i=0;i<actCube.keys.length;i++) {
            if(actCube.keys[i].equals(actFace)) {
                actCube.keys.splice(i,1);
                actCube.view.removeObject(actFace);
                this.keysLeft--;
                if(this.keysLeft == 0)
                    this.getCubeByID(this.target.id).getView().paintFace(this.target.face, 0x00ff00);
                return;
            }
        }

        //checking coins
        for(i=0;i<actCube.coins.length;i++) {
            if(actCube.coins[i].equals(actFace)) {
                actCube.coins.splice(i,1);
                actCube.view.removeObject(actFace);
                this.coinCounter.text(parseInt(this.coinCounter.text())+10);
                return;
            }
        }

        //checking traps
        for(i=0;i<actCube.traps.length;i++) {
            if(actCube.traps[i].equals(actFace)) {
                this.showEndMessage("Game over :(", 0xff2800);
                return;
            }
        }
    }

    showEndMessage(text: string, color: number) {
        setTimeout(function() {
            Menu.gameBuilder.gameSucceeded();
            var options:THREE.TextGeometryParameters = {
                size: this.gameEndTextOrientation.size,
                height: 0.2,
                weight: "normal",
                bevelEnabled: false,
                curveSegments: 12,
                font: "helvetiker"
            };
            var geom = new THREE.TextGeometry(text, options);
            var mat = new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                color: color,
                shininess: 100,
                metal: true
            });
            var youWin = THREE.SceneUtils.createMultiMaterialObject(geom, [mat]);
            youWin.position.set(this.gameEndTextOrientation.position.x, this.gameEndTextOrientation.position.y, this.gameEndTextOrientation.position.z);
            youWin.rotation.set(this.gameEndTextOrientation.rotation.x * Math.PI, this.gameEndTextOrientation.rotation.y * Math.PI, this.gameEndTextOrientation.rotation.z * Math.PI);
            this.view.add(youWin);
        }.bind(this),100);
    }
}