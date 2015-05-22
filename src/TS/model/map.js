/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../model/cube.ts"/>
/// <reference path="../model/ball.ts"/>
/// <reference path="../view/mapview.ts"/>
/// <reference path="../camera/camerahandler.ts"/>
/// <reference path="../init.ts"/>
var MapModel = (function () {
    function MapModel() {
    }
    MapModel.prototype.generateModel = function (rawMap, keyHandler, cameraHandler) {
        this.cubes = [];
        for (var i = 0; i < rawMap.elements.length; i++) {
            for (var j = 0; j < rawMap.elements[i].length; j++) {
                for (var k = 0; k < rawMap.elements[i][j].length; k++) {
                    var cube = rawMap.elements[i][j][k];
                    if (cube.id != undefined) {
                        this.cubes.push(new Cube(cube.id, rawMap.cubeSize, parseInt(cube.color, 16), new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z), cube.neighbours));
                    }
                }
            }
        }
        this.winTextOrientation = rawMap.messageorientation;
        this.target = rawMap.target;
        //coloring the target cube's target face on the map
        this.getCubeByID(this.target.id).getView().paintFace(this.target.face, 0x00ff00);
        this.view = new MapView();
        this.view.appendChildrenFromModel(this.cubes);
        this.view.position.set(0, 0, 0);
        this.ball = new Ball(this.getCubeByID(rawMap.ball.startingCube), rawMap.ball.startingFace, rawMap.ball.startingDirection, this, cameraHandler.fpControl);
        var ballView = new BallView(0.3, rawMap.ball.texture.colorMapURL, keyHandler, this);
        this.view.add(ballView);
        this.ball.setView(ballView);
    };
    MapModel.prototype.getCubeByID = function (id) {
        for (var i = this.cubes.length - 1; i >= 0; i--) {
            if (this.cubes[i].id == id)
                return this.cubes[i];
        }
        throw "There is no cube with the given id: " + id;
    };
    MapModel.prototype.checkWinnerPosition = function () {
        if (this.ball.actCube.id === this.target.id && this.ball.actFace === this.target.face) {
            Menu.gameBuilder.gameSucceeded();
            var options = {
                size: this.winTextOrientation.size,
                height: 0.2,
                weight: "normal",
                bevelEnabled: false,
                curveSegments: 12,
                font: "helvetiker"
            };
            var geom = new THREE.TextGeometry("You win", options);
            var mat = new THREE.MeshPhongMaterial({ specular: 0xffffff, color: 0x33bb33, shininess: 100, metal: true });
            var youWin = THREE.SceneUtils.createMultiMaterialObject(geom, [mat]);
            youWin.position.set(this.winTextOrientation.position.x, this.winTextOrientation.position.y, this.winTextOrientation.position.z);
            youWin.rotation.set(this.winTextOrientation.rotation.x * Math.PI, this.winTextOrientation.rotation.y * Math.PI, this.winTextOrientation.rotation.z * Math.PI);
            this.view.add(youWin);
            return false;
        }
        return true;
    };
    return MapModel;
})();
//# sourceMappingURL=map.js.map