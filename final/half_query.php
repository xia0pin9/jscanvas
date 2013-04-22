<?php
//set the JSON header
header("Content-type: text/json");

//$total = $_GET['type'];

//$data = array(219554, 687439, 297786, 233928, 282759, 237110, 195981, 270769, 196751, 283103, 219356, 1069451, 291615, 82437, 4333, 2);

//echo json_encode($data);
$categories = array("2012 May", "2012 June", "2012 July", "2012 August", "2012 Septemper", "2012 October", "2012 November", "2013 January");
$data = array(906993, 531714, 519869, 466750, 479854, 1288807, 374052, 4333);

$result = array($categories, $data);
echo json_encode($result);
?>