<?php
	try {
		$directory = '../../res/maps';
		$fileList = array_diff(scandir($directory), array('..', '.'));
		
		if($fileList != false) {
			print json_encode($fileList);
		}
		else {
			print "something went wrong during the reading of maps";
		}
	} catch (Exception $e) {
	    echo 'Caught exception: ',  $e->getMessage(), "\n";
	}
?>