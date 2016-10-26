/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="space.ts"/>
/// <reference path="lighting.ts"/>
/// <reference path="idle.ts"/>
/// <reference path="keyeventhandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="gamebuilder.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

module Menu {
    export var gameBuilder:GameBuilder;
}

$(function () {
    Menu.gameBuilder = new GameBuilder();
    //html element references
    var newGameButton = $("#newGameButton");
    var coinContainer = $("#coinContainer");
    var mainMenu: JQuery;


    //loading the menu
    $.ajax("res/templates/newGameMenu.html")
        .done(function (data) {
            console.log("Downloading 'mainMenu.html' DONE");
            //adding the html template to the body
            $('body').append(data);

            mainMenu = $("#mainMenu");
        })
        .fail(function (response) {
            console.log("FAILED TO LOAD mainMenu.html TEMPLATE: ");
            console.log(response);
        });


    /**
     * Eventlistener function for the NewGame button in the upper right corner
     */
    function onClickNewGame() {
        Menu.gameBuilder.stopGame();
        mainMenu.show();
        newGameButton.hide();
        coinContainer.hide();
    }


    newGameButton.on("click touchstart", onClickNewGame);
});