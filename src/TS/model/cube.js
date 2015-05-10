/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../view/cubeview.ts"/>
var Cube = (function () {
    function Cube(id, size, color, position, neighbours) {
        this.id = id;
        this.position = position.clone();
        this.neighbours = neighbours;
        this.view = new CubeView(size, color, this.position.x * size, this.position.y * size, this.position.z * size);
    }
    Cube.prototype.getView = function () {
        return this.view;
    };
    Cube.prototype.moveRequest = function (fromFace, direction, extraKeys) {
        for (var i = 0, size = this.neighbours.length; i < size; i++) {
            if (this.neighbours[i].fromFace === fromFace && this.neighbours[i].requiredDirection === direction) {
                return { cubeID: this.neighbours[i].toCube, toFace: this.neighbours[i].toFace };
            }
        }
        return null;
    };
    return Cube;
})();
//# sourceMappingURL=cube.js.map