<?php
$hostname = "localhost";
$user = "snort";
$password = "snortpass";
$database = "snort";
//$bd = mysql_connect($hostname, $user, $password) 
//or die("Opps some thing went wrong");
//mysql_select_db($database, $bd) or die("Opps some thing went wrong");
$mysqli = new mysqli($hostname, $user, $password, $database);
if ($mysqli->connect_errno){
    die("Mysql connect error: ".$mysqli->connect_error);
}
?>
