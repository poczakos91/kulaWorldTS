/// <reference path="../../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="map.ts"/>
var Remote;
(function (Remote) {
    function loadMap(mapName, callback, context) {
        $.ajax({
            url: "src/PHP/mapLoader.php",
            type: "POST",
            data: { mapName: mapName },
            context: context
        }).done(callback);
    }
    Remote.loadMap = loadMap;
    function getMapList(callback) {
        $.ajax({
            url: "src/PHP/getMapList.php",
            type: "POST"
        }).done(callback);
    }
    Remote.getMapList = getMapList;
})(Remote || (Remote = {}));
//# sourceMappingURL=maploader.js.map