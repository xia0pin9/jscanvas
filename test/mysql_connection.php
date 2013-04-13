<?php

$username = "root";
$password = "wxl198881";
$hostname = "localhost";
$database = "mydb";

// connect to the server
$conn = new mysqli($hostname, $username, $password , $database);

// check connection
if (mysqli_connect_errno()) {
  exit('Connect failed: '. mysqli_connect_error());
}

//$conn->close();         // close the connection
?>