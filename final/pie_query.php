<?php
//set the JSON header
header("Content-type: text/json");


$data = array(array('21', 4), array('22', 775666), array('25', 19437), array('80', 2531023), array('110', 205), array('139', 22), array('143', 3028), array('443', 196166), array('636', 2707), array('993', 82), array('other', 20), array('593', 3), array('928', 4), array('995', 5));


echo json_encode($data);
?>