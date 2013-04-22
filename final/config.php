<?php
$hostname = "localhost";
$user = "root";
$password = "wxl198881";
$database = "mysql";
//$bd = mysql_connect($hostname, $user, $password) 
//or die("Opps some thing went wrong");
//mysql_select_db($database, $bd) or die("Opps some thing went wrong");
$mysqli = new mysqli($hostname, $user, $password, $database);
if (mysqli_connect_errno()){
    exit("Mysql connect error: ".mysqli_connect_error());
}
?>
