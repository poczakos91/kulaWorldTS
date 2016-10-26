<?php
    header('Access-Control-Allow-Origin: *');
    $mapName = $_POST["mapName"];
    $map = file_get_contents("../../res/maps/".$mapName);
    print $map;
?>