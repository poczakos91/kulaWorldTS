/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../model/cube.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        _super.call(this);
    }
    MapView.prototype.appendChildrenFromModel = function (cubes) {
        for (var i = 0; i < cubes.length; i++) {
            this.add(cubes[i].getView());
        }
    };
    return MapView;
})(THREE.Object3D);
//# sourceMappingURL=mapview.js.map