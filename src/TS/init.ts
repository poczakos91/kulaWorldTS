/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="space.ts"/>
/// <reference path="lighting.ts"/>
/// <reference path="idle.ts"/>
/// <reference path="keyeventhandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="model/maploader.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="gamebuilder.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */


$(function () {
    Menu.gameBuilder = new GameBuilder();
    Menu.mainMenu = $("#mainMenu");
    Menu.newGameButton = $("#newGameButton");
    Menu.newGameButton.on("click touchstart", Menu.onClickNewGame);
    Remote.getMapList(Menu.createMapList);
});


module Menu {
    export var gameBuilder: GameBuilder;
    //reference to div element with id 'mainMenu' (the menu)
    export var mainMenu: JQuery;
    //reference to div element with id 'newGameButton' (the Nem Game button in the right upper corner)
    export var newGameButton: JQuery;

    /**
     * Creates a list from the downloaded mapname list
     * @param data
     */
    export function createMapList(data) {
        var mapList = JSON.parse(data);
        var listHolder = $("#mapList");
        for (var mapName in mapList) {
            if (mapList.hasOwnProperty(mapName)) {
                var listItem = $("<div class='listItem' data='" + mapList[mapName] + "'>" + mapList[mapName] + "</div>");
                listItem.on("click touchstart", onClickListItem);
                listHolder.append(listItem);
            }
        }
    }

    /**
     * Eventlistener function for the mapname list items in the menu
     * @param e
     */
    export function onClickListItem(e) {
        Remote.loadMap(e.currentTarget.innerText, gameBuilder.startGame, gameBuilder);
        mainMenu.hide();
        newGameButton.show();
    }

    /**
     * Eventlistener function for the NewGame button in the upper right corner
     */
    export function onClickNewGame() {
        gameBuilder.stopGame();
        mainMenu.show();
        newGameButton.hide();
    }
}