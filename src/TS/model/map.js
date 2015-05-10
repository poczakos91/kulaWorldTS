/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../model/cube.ts"/>
/// <reference path="../model/ball.ts"/>
/// <reference path="../view/mapview.ts"/>
var MapModel = (function () {
    function MapModel() {
    }
    MapModel.prototype.generateModel = function (rawMap, keyHandler, fpControl) {
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
        this.ball = new Ball(this.getCubeByID(rawMap.ball.startingCube), rawMap.ball.startingFace, rawMap.ball.startingDirection, this, fpControl);
        var ballView = new BallView(0.3, rawMap.ball.texture.colorMapURL, keyHandler);
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
        //TODO csin�ld meg a kulaWorldjs alapj�n de igen gyorsan
        return false;
    };
    return MapModel;
})();
//# sourceMappingURL=map.js.map