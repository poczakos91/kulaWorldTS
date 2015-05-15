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
var Menu;
(function (Menu) {
    Menu.gameBuilder;
    //reference to div element with id 'mainMenu' (the menu)
    Menu.mainMenu;
    //reference to div element with id 'newGameButton' (the Nem Game button in the right upper corner)
    Menu.newGameButton;
    /**
     * Creates a list from the downloaded mapname list
     * @param data
     */
    function createMapList(data) {
        var mapList = data.split(',');
        var listHolder = $("#mapList");
        for (var i = 0; i < mapList.length; i++) {
            var listItem = $("<div class='listItem' data='" + mapList[i] + "'>" + mapList[i] + "</div>");
            listItem.on("click touchstart", onClickListItem);
            listHolder.append(listItem);
        }
    }
    Menu.createMapList = createMapList;
    /**
     * Eventlistener function for the mapname list items in the menu
     * @param e
     */
    function onClickListItem(e) {
        Remote.loadMap(e.currentTarget.innerText, Menu.gameBuilder.startGame, Menu.gameBuilder);
        Menu.mainMenu.hide();
        Menu.newGameButton.show();
    }
    Menu.onClickListItem = onClickListItem;
    /**
     * Eventlistener function for the NewGame button in the upper right corner
     */
    function onClickNewGame() {
        Menu.gameBuilder.stopGame();
        Menu.mainMenu.show();
        Menu.newGameButton.hide();
    }
    Menu.onClickNewGame = onClickNewGame;
})(Menu || (Menu = {}));
//# sourceMappingURL=init.js.map