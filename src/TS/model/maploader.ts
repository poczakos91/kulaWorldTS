/// <reference path="../../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="map.ts"/>

module Remote {
    export function loadMap(mapName: string, callback: any, context: any) {
        $.ajax({
            url: "src/PHP/mapLoader.php",
            type: "POST",
            data: {mapName: mapName},
            context: context
        }).done(callback)
    }

    export function getMapList(callback: any) {
        $.ajax({
            url: "src/PHP/getMapList.php",
            type: "POST"
        }).done(callback)
    }
}