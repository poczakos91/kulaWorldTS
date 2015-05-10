/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CubeView = (function (_super) {
    __extends(CubeView, _super);
    function CubeView(size, color, posx, posy, posz) {
        var cubeGeometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshLambertMaterial({ color: color, vertexColors: THREE.FaceColors });
        _super.call(this, cubeGeometry, material);
        this.position.set(posx, posy, posz);
    }
    CubeView.prototype.paintFace = function (face, color) {
        var i, j;
        switch (face) {
            case "top":
                i = 4;
                j = 5;
                break;
            case "bottom":
                i = 6;
                j = 7;
                break;
            case "left":
                i = 0;
                j = 1;
                break;
            case "right":
                i = 2;
                j = 3;
                break;
            case "front":
                i = 8;
                j = 9;
                break;
            case "rear":
                i = 10;
                j = 11;
        }
        this.geometry.faces[i].color.setHex(color);
        this.geometry.faces[j].color.setHex(color);
        this.geometry.colorsNeedUpdate = true;
    };
    CubeView.prototype.faceStringToNumber = function (face) {
        switch (face) {
            case "top":
                return 0;
            case "bottom":
                return 1;
            case "left":
                return 2;
            case "right":
                return 3;
            case "front":
                return 4;
            case "rear":
                return 5;
            default:
                throw "There's no face like: " + face;
        }
    };
    return CubeView;
})(THREE.Mesh);
//# sourceMappingURL=cubeview.js.map