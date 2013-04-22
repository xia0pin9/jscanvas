<?php
//set the JSON header
header("Content-type: text/json");

//$total = $_GET['type'];

//$data = array(219554, 687439, 297786, 233928, 282759, 237110, 195981, 270769, 196751, 283103, 219356, 1069451, 291615, 82437, 4333, 2);

//echo json_encode($data);
$categories = array("May 2012 Day 01-15", "May 2012 Day 16-31", "Jun 2012 Day 01-15", "Jun 2012 Day 16-30", "Jul 2012 Day 01-15", "Jul 2012 Day 16-31", "Aug 2012 Day 01-15", "Aug 2012 Day 16-31", "Sep 2012 Day 01-15", "Sep 2012 Day 16-30", "Oct 2012 Day 01-15", "Oct 2012 Day 16-31", "Nov 2012 Day 01-15", "Nov 2012 Day 16-30");
$data = array(219554, 687439, 297786, 233928, 282759, 237110, 195981, 270769, 196751, 283103, 219356, 1069451, 291615, 82437);

$result = array($categories, $data);
echo json_encode($result);
?>