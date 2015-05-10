<?php
    $mapName = $_POST["mapName"];
    $map = file_get_contents("../../res/maps/".$mapName);
    print $map;
?>