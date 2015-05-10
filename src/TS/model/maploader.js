/// <reference path="../../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="map.ts"/>
function loadMap(mapName, callback, context) {
    $.ajax({
        url: "src/PHP/mapLoader.php",
        type: "POST",
        data: { mapName: mapName },
        context: context
    }).done(callback);
}
//# sourceMappingURL=maploader.js.map