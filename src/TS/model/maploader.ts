/// <reference path="../../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="map.ts"/>

function loadMap(mapName: string, callback: any, context: any) {
    $.ajax({
        url: "src/PHP/mapLoader.php",
        type: "POST",
        data: {mapName: mapName},
        context: context
    }).done(callback)
}