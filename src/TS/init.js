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
    Menu.newGameButton = $("#newGameButton");
    Menu.newGameButton.on("click touchstart", Menu.onClickNewGame);
    $.ajax("res/templates/newGameMenu.html").done(function (data) {
        console.log("Downloading 'mainMenu.html' DONE");
        //adding the html template to the body
        $('body').append(data);
    }).fail(function (response) {
        console.log("FAILED TO LOAD mainMenu.html TEMPLATE: ");
        console.log(response);
    });
});
var Menu;
(function (Menu) {
    Menu.gameBuilder;
    //reference to div element with id 'mainMenu' (the menu)
    Menu.mainMenu;
    //reference to div element with id 'newGameButton' (the Nem Game button in the right upper corner)
    Menu.newGameButton;
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