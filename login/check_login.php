<?php
ob_start();
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

$myusername = $_POST['login'];
$mypassword = $_POST['password'];
$mypassword = md5($mypassword);

//prepared statement
if(!($stmt = $conn->prepare("SELECT username FROM `user` WHERE username = ? AND password = ? LIMIT 5"))){
	echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}

//binding
if(!$stmt->bind_param('ss', $myusername, $mypassword)){
	echo "Binding paramaters failed: (" . $stmt->erron . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$res = $stmt->get_result();
$row = $res->fetch_assoc();

if($row['username'] == $username){
session_start();
$_SESSION['myusername'] = $myusername;
//$_SESSION['mypassword'] = $mypassword;
header("location:login_success.php");
}
else{
echo "Wrong Username or Password";
}
ob_end_flush();
/// close the connection
$stmt->close();        
?>